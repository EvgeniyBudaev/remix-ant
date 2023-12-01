import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { Blob } from "node:buffer";
import { installGlobals } from "@remix-run/node";

const MockIntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.spyOn(window.URL, "createObjectURL").mockImplementation(
  () => "http://fake.url"
);
global.Blob = Blob;
global.ResizeObserver = ResizeObserver;
window.ENV = process.env;
installGlobals();
global.IS_REACT_ACT_ENVIRONMENT = true;
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

afterEach(() => {
  cleanup();
});
