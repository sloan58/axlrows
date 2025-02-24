import './bootstrap';
import { basicEditor } from "prism-code-editor/setups"
import "prism-code-editor/prism/languages/sql"
import { livewire_hot_reload } from 'virtual:livewire-hot-reload'

import collapse from "@alpinejs/collapse";
import anchor from "@alpinejs/anchor";

livewire_hot_reload();

document.addEventListener(
    "alpine:init",
    () => {
        const modules = import.meta.glob("./plugins/**/*.js", { eager: true });

        for (const path in modules) {
            window.Alpine.plugin(modules[path].default);
        }
        window.Alpine.plugin(collapse);
        window.Alpine.plugin(anchor);
    },
    { once: true },
);

// noinspection JSConstantReassignment
window.basicEditor = basicEditor;
