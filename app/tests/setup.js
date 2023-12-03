import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { Blob } from "node:buffer";
import { installGlobals } from "@remix-run/node";
import { defineWebWorkers } from "@vitest/web-worker/pure";
import { v4 as uuidV4 } from "uuid";

const objectStorage = {};

vi.spyOn(window.URL, "createObjectURL").mockImplementation((...args) => {
  if ("_kek_blob_parts" in args[0]) {
    const blob = args[0];

    const objectUrl = `blob:${uuidV4()}`;
    objectStorage[objectUrl] = blob._kek_blob_parts.join("");
    return objectUrl;
  }

  return "http://fake.url";
});

global.__vitest_worker__.rpc = new Proxy(global.__vitest_worker__.rpc, {
  get(target, property, _receiver) {
    if (property === "fetch") {
      return async (url, ...args) => {
        const objectUrlIndex = url.indexOf("blob:");

        if (objectUrlIndex !== -1) {
          const objectUrl = url.slice(objectUrlIndex);
          return { code: await objectStorage[objectUrl] };
        }

        return target.fetch(url, ...args);
      };
    } else {
      return target[property];
    }
  },
});

global.Worker = undefined;
defineWebWorkers();

let globalBlob = Blob;

Object.defineProperty(global, "Blob", {
  get() {
    return globalBlob;
  },
  set(_value) {
    class Blobba extends _value {
      constructor(...args) {
        super(...args);

        this._kek_blob_parts = args[0];
        this._kek_options = args[1];
      }
    }

    globalBlob = Blobba;
  },
});

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
