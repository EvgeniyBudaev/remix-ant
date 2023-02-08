import {dataClouds, WordCloud} from "~/uikit";

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
        <div>
            <WordCloud data={dataClouds} />
        </div>
    </div>
  );
}
