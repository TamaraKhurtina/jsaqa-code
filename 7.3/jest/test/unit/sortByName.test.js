const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("Books names should handle equal names (return 0 branch)", () => {
    expect(
      sorting.sortByName(["Гарри Поттер", "Гарри Поттер"])
    ).toEqual(["Гарри Поттер", "Гарри Поттер"]);
  });

  it("Books names should return empty array for empty input", () => {
    expect(sorting.sortByName([])).toEqual([]);
  });

  it("Books names should return single element array unchanged", () => {
    expect(sorting.sortByName(["Одна книга"])).toEqual(["Одна книга"]);
  });
});