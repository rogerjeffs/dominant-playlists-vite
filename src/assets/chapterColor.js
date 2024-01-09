export default function chapterColor(chapter) {
  const chapterColors = {
    Kap1: {
      dark: "#415dff",
      main: "#7a8dff",
      light: "#afbbff",
      lightest: "#dee2ff",
    },
    Kap2: {
      dark: "#a9b79b",
      main: "#c7d0be",
      light: "#e3e7de",
      lightest: "#eef1eb",
    },
    Kap3: {
      dark: "#ffa765",
      main: "#FFCBA4",
      light: "#ffe5d1",
      lightest: "#ffefe4",
    },
    Kap4: {
      dark: "#979fb7",
      main: "#babfcf",
      light: "#dcdfe7",
      lightest: "#eaecf1",
    },
    Kap5: {
      dark: "#e8bb97",
      main: "#f4dfce",
      light: "#f9efe6",
      lightest: "#fcf5f0",
    },
    Kap6: {
      dark: "#d28c89",
      main: "#e3b7b5",
      light: "#f1dbda",
      lightest: "#f7e9e9",
    },
    Kap7: {
      dark: "#c76371",
      main: "#D58A94",
      light: "#eac4c9",
      lightest: "#f2dcdf",
    },
    Kap8: {
      dark: "#abb09a",
      main: "#c6cabb",
      light: "#e2e4dd",
      lightest: "#eeefeb",
    },
  };
  const color = chapterColors[chapter];
  return color;
}
