<div x-data="app" x-init="init" class="flex-col space-y-4">
    <div id="editor"></div>
    <div class="flex justify-end space-x-2">
        <x-button x-on:click="submit" variant="outline">
            <x-lucide-refresh-cw class="mr-2 size-4 animate-spin" x-show="submittingQuery"/>
            Submit
        </x-button>
    </div>
    <div class="rounded-md border bg-background p-4 shadow-sm">
        <div class="overflow-x-auto">
            <table class="divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                    @foreach($headers as $header)
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {{ $header }}
                        </th>
                    @endforeach
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                @forelse($results as $row)
                    <tr>
                        @foreach($headers as $header)
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium text-foreground">{{ is_array($row[$header]) ? $row[$header]['_'] ?? '' : $row[$header] }}</div>
                            </td>
                        @endforeach
                    </tr>
                @empty
                    Submit a query to see results here.
                @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @script
    <script>
        Alpine.data('app', () => {
            return {
                query: '',
                editor: null,
                submittingQuery: false,
                init: function () {
                    if (this.editor) return;
                    this.editor = basicEditor('#editor', {
                        language: 'sql',
                        theme: 'github-dark',
                        value: '\n\n\n'
                    }, () => {
                        console.log('Editor ready');
                    });

                    this.editor.addListener('update', e => {
                        this.query = e
                    })
                },
                submit: async function () {
                    this.submittingQuery = true;
                    await $wire.setQuery(this.query);
                    this.submittingQuery = false;
                },
            }
        })
    </script>
    @endscript
</div>
