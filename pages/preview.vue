<script setup lang="ts">
const personalDetails = reactive({
  title: "Personal details",
  photo: null,
  jobTitle: "Frontend developer",
  firstName: "Mirjalol",
  lastName: "Norqulov",
  email: "mirjalol2401@gmail.com",
  phone: "+998 93 106 73 37",
  country: "Uzbekistan",
  city: "Tashkent",
  address: "Chilonzor 20A, 18, 43",
  nationality: "Uzbek",
  birthPlace: "Samarqand",
  birthDate: "24.01.1996",
});

const sections = shallowRef([
  {
    id: 1,
    title: "Employment history",
    hint: "Include your last 10 years of relevant experience and dates in this section. List your most recent position first",
    items: [
      {
        jobTitle: "Frontend Engineer",
        employer: "3i",
        interval: {
          start: "December, 2019",
          end: "September, 2021",
        },
        city: "Tashkent",
        description:
          "Worked as a frontend developer in a big team of international company",
        rendererComponent: "employment-item",
      },
    ],
  },
  {
    id: 2,
    title: "Education",
    hint: "If relevant, include your most recent educational achievements and the dates here",
    items: [
      {
        id: 1,
        school: "Tashkent Bank College",
        degree: "O'rta ta'lim",
        interval: {
          start: "September, 2011",
          end: "June, 2014",
        },
        city: "Tashkent",
        description: "",
        rendererComponent: "education-item",
      },
    ],
  },
  {
    id: 3,
    title: "Websites & Social Links",
    hint: "You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website",
  },
  {
    id: 5,
    title: "Languages",
    hint: "",
    items: [
      {
        id: "asd",
        language: "English",
        level: "HIGH",
        rendererComponent: "language-item",
      },
    ],
  },
  {
    id: 6,
    title: "Skills",
    hint: "",
  },
]);

const summary = reactive({
  title: "Professional summary",
  content:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat enim sapiente obcaecati cum delectus cumque mollitia, perspiciatis vero dolor minima sunt, odio iure magni ea debitis ad nisi numquam repellat.",
});
</script>

<template>
  <div class="flex min-h-screen items-stretch justify-center bg-slate-100 p-8">
    <TemplatesDefaultTemplate
      :personal-details="personalDetails"
      :summary="summary"
      :sections="sections"
    />
  </div>
</template>
