<?php

namespace App\Models;

use Exception;
use SimpleXMLElement;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ucm extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'ipAddress',
        'username',
        'password',
        'version',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'password' => 'encrypted',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password'];

    /**
     * @throws GuzzleException
     */
    public function sendQuery($statement): array
    {
        return $this->callAxlApi(
            $this->buildSoapRequest($statement)
        );
    }

    private function buildSoapRequest($statement): array|string
    {
        return '<?xml version="1.0" encoding="UTF-8"?>
                  <SOAP-ENV:Envelope
                    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:ns1="http://www.cisco.com/AXL/API/' . $this->version . '"
                    >
                    <SOAP-ENV:Body>
                        <ns1:executeSQLQuery>
                            <sql>' . $statement . '</sql>
                        </ns1:executeSQLQuery>
                    </SOAP-ENV:Body>
                  </SOAP-ENV:Envelope>';
    }

    /**
     * @throws GuzzleException
     * @throws Exception
     */
    private function callAxlApi($body): array
    {
        $client = new Client();
        try {
            $response = $this->processAxlResponse(
                $client->request('POST', "https://{$this->ipAddress}:8443/axl/", [
                    'auth' => [$this->username, $this->password],
                    'headers' => [
                        'Content-Type' => 'text/xml; charset=utf-8',
                        'SOAPAction' => "UCM:DB ver={$this->version} executeSQLQuery",
                    ],
                    'verify' => false,
                    'body' => $body,
                    'connect_timeout' => 3
                ])
            );
            return [
                'data' => $response,
                'error' => ''
            ];
        } catch (Exception $e) {
            $response = $this->formatSoapResponse($e->getResponse()->getBody()->getContents());
            $xml = new SimpleXMLElement($response);
            $body = $xml->xpath('//soapenvFault//faultstring');
            $message = get_object_vars($body[0])[0] ?? '';

            logger()->error(__METHOD__ . ": Error calling executeSQLQuery", [
                'line' => $e->getLine(),
                'message' => $message,
                'ucm' => $this->id,
//                'user' => auth()->user()->id
            ]);
            return [
                'data' => [],
                'error' => $message
            ];
        }
    }

    /**
     * @throws Exception
     */
    private function processAxlResponse($response)
    {
        $response = $this->formatSoapResponse($response->getBody()->getContents());
        $xml = new SimpleXMLElement($response);
        $body = $xml->xpath('//soapenvBody//nsexecuteSQLQueryResponse//return//row');
        return json_decode(json_encode((array) $body), true);
    }

    /**
     * @param $response
     * @return array|string|null
     */
    private function formatSoapResponse($response): array|string|null
    {
        return preg_replace(
            "/(<\/?)(\w+):([^>]*>)/",
            "$1$2$3",
            $response
        );
    }
}
