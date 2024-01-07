export default function chapterColor(chapter) {
  const chapterColors = {
    Kap1: {
      main: "#7a8dff",
      light: "#afbbff",
      lightest: "#dee2ff",
    },
    Kap2: {
      main: "#c7d0be",
      light: "#e3e7de",
      lightest: "#eef1eb",
    },
    Kap3: {
      main: "#FFCBA4",
      light: "#ffe5d1",
      lightest: "#ffefe4",
    },
    Kap4: {
      main: "babfcf",
      light: "#dcdfe7",
      lightest: "#eaecf1",
    },
    Kap5: {
      main: "#f4dfce",
      light: "#f9efe6",
      lightest: "#fcf5f0",
    },
    Kap6: {
      main: "#e3b7b5",
      light: "#f1dbda",
      lightest: "#f7e9e9",
    },
    Kap7: {
      main: "#D58A94",
      light: "#eac4c9",
      lightest: "#f2dcdf",
    },
    Kap8: {
      main: "#c6cabb",
      light: "#e2e4dd",
      lightest: "#eeefeb",
    },
  };
  const color = chapterColors[chapter];
  return color;
}
