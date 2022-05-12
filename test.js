const schools = [
  {
    name: "YorkTown",
    country: "Spain",
  },
  {
    name: "Stanford",
    country: "USA",
  },
  {
    name: "Gymnasium Achern",
    country: "Germany",
  },
];

const editSchoolName = (schools, oldName, country) =>
  schools.map((item) => {
    if (item.name === oldName) {
      return { ...item, country };
    } else {
      return item;
    }
  });

console.log(editSchoolName(schools, "YorkTown", "Nepal"));
