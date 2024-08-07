import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $Stores: "src/lib/Stores",
      $UI: "src/lib/UI",
      $server: "src/lib/server",
	  $CreatePool: "src/lib/Components/CreatePool",
	  $Components: "src/lib/Components",
	  $Icons: "src/lib/Icons",
    },
    // csrf: {
    // 	checkOrigin: process.env.NODE_ENV === 'development' ? false : true
    // },
    // //TODO!
    // csp: {
    // 	directives: {
    // 		'default-src': ['*']
    // 	}
    // },
    // embedded: true,
  },

  preprocess: [vitePreprocess({})],
};

export default config;
