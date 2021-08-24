import Vue from 'vue'
import VueHighlightJS from "vue-highlight.js";

import sql from "highlight.js/lib/languages/sql";

// import "highlight.js/styles/dracula.css";

Vue.use(VueHighlightJS, {
  languages: {
    sql,
  }
});
