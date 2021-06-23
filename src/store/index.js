import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistedState = createPersistedState({
  key: "resumeMaker",
  paths: ["personalDetails", "summary", "sections"],
});

export default new Vuex.Store({
  state: {
    personalDetails: {
      title: "Personal details",
      photo: null,
      jobTitle: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      address: "",
      nationality: "",
      birthPlace: "",
      birthDate: "",
    },
    summary: {
      title: "Professional summary",
      content: "",
    },
    sections: [
      {
        id: 1,
        title: "Employment history",
        hint: "Include your last 10 years of relevant experience and dates in this section. List your most recent position first",
        component: "employment-history",
        items: [],
      },
      {
        id: 2,
        title: "Education",
        hint: "If relevant, include your most recent educational achievements and the dates here",
        component: "education",
        items: [],
      },
      {
        id: 3,
        title: "Websites & Social Links",
        hint: "You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website",
        component: "website-links",
        items: [],
      },
      {
        id: 5,
        title: "Languages",
        hint: "",
        component: "languages-section",
        items: [],
      },
      {
        id: 6,
        title: "Skills",
        hint: "",
        component: "skills-section",
        items: [],
      },
    ],
  },
  mutations: {
    SET_PERSONAL_DETAILS(state, value) {
      state.personalDetails = value;
    },
    SET_SUMMARY(state, value) {
      state.summary = value;
    },
    SET_SECTIONS(state, value) {
      state.sections = value;
    },
  },
  actions: {},
  modules: {},
  plugins: [persistedState],
});
