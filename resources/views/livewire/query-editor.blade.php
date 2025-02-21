<div x-data="app" x-init="init" class="flex-col space-y-4">
    <div id="editor"></div>
    <div class="flex justify-end space-x-2">
        <x-button x-on:click="submit" variant="outline">Submit</x-button>
    </div>
    <div class="rounded-md border bg-background p-4 shadow-sm">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Title
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Role
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-foreground">Jane Cooper</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-foreground">Regional Paradigm Technician</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        Admin
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-primary hover:underline">Edit</a>
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-foreground">Cody Fisher</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-foreground">Product Directives Officer</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        Owner
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-primary hover:underline">Edit</a>
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-foreground">Esther Howard</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-foreground">Forward Response Developer</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Inactive
                </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        Member
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-primary hover:underline">Edit</a>
                    </td>
                </tr>
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
                init: function () {
                    if( this.editor ) return;
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
                submit: function () {
                    $wire.set('query', this.query);
                },
            }
        })
    </script>
    @endscript
</div>
