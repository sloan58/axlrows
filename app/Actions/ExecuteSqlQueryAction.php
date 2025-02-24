<?php

namespace App\Actions;

use SimpleXMLElement;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use GuzzleHttp\Promise\PromiseInterface;
use Lorisleiva\Actions\Concerns\AsAction;
use Illuminate\Http\Client\ConnectionException;

class ExecuteSqlQueryAction
{
    use AsAction;

    /**
     * @throws ConnectionException
     */
    public function handle(string $sql): array
    {
        $username = "Administrator";
        $password = 'A$h8urn!';
        $cucmUrl = "https://192.168.1.10:8443/axl/";

        $soapBody = $this->getQueryTemplate($sql);

        $response = Http::withOptions(["verify" => false])
            ->withBasicAuth($username, $password)
            ->withHeaders([
                "Content-Type" => "text/xml; charset=utf-8",
                "SOAPAction" => '"executeSQLQuery"'
            ])
            ->withBody($soapBody, "text/xml")
            ->post($cucmUrl);

        return $this->handleResponse($response);
    }

    /**
     * @param string $sql
     * @return array|false|string|string[]
     */
    public function getQueryTemplate(string $sql): string|array|false
    {
        $template = file_get_contents(storage_path('execute_sql_query_template.xml'));
        return str_replace(
            ['{{sql}}', '{{version}}'],
            [trim($sql), '12.5'],
            $template
        );
    }

    /**
     * @param PromiseInterface|Response $response
     * @return array|false|false[]|SimpleXMLElement[]|null
     */
    public function handleResponse(PromiseInterface|Response $response): array|null|false
    {
        $results = [];
        $xmlString = $response->body(); // The raw SOAP response

        $xml = simplexml_load_string($xmlString);
        $xml->registerXPathNamespace(
            "soapenv",
            "http://schemas.xmlsoap.org/soap/envelope/"
        );
        $xml->registerXPathNamespace("ns", "http://www.cisco.com/AXL/API/12.5");

        $rows = $xml->xpath(
            '//soapenv:Body/ns:executeSQLQueryResponse/*[local-name()="return"]/*[local-name()="row"]'
        );

        foreach ($rows as $row) {
            $results[] = json_decode(json_encode($row), true);
        }

        return $results;
    }
}
