import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { Blob } from "node:buffer";
import { installGlobals } from "@remix-run/node";
import { defineWebWorkers } from "@vitest/web-worker/pure";
import { v4 as uuidV4 } from "uuid";

const objectStorage = {};

vi.spyOn(window.URL, "createObjectURL").mockImplementation(
    (...args) => {
        if(args[0] instanceof global.Blob) {
            const blob = args[0];

            const objectUrl = `blob:${uuidV4()}`;
            objectStorage[objectUrl] = blob.text();
            return objectUrl;
        }

        return "http://fake.url";
    }
);

global.__vitest_worker__.rpc = new Proxy(global.__vitest_worker__.rpc, {
    get(target, property, _receiver) {
        if(property === "fetch") {
            return async (url, ...args) => {
                const objectUrlIndex = url.indexOf("blob:");

                if(objectUrlIndex !== -1) {
                    const objectUrl = url.slice(objectUrlIndex);
                    return { code: await objectStorage[objectUrl] };
                }

                return target.fetch(url, ...args);
            }
        } else {
            return target[property];
        }
    }
});

global.Worker = undefined;
defineWebWorkers();

Object.defineProperty(global, "Blob", {
    get() {
        return Blob;
    },
    set(_value) {},
})

const MockIntersectionObserver = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));

global.ResizeObserver = ResizeObserver;
window.ENV = process.env;
installGlobals();
global.IS_REACT_ACT_ENVIRONMENT = true;
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

afterEach(() => {
    cleanup();
});