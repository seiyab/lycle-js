import { lycle } from ".";

describe("", () => {
  let x: number;
  beforeEach(() => {
    x = 0;
  });

  it("", () => {
    const l = lycle(
      [
        () => ({
          beforeEach: () => {
            x = x + 1;
          },
          afterEach: () => {
            x = x - 1;
          },
        }),
        () => ({
          beforeEach: () => {
            x = x * 3;
          },
          afterEach: () => {
            x = x / 3;
          },
        }),
      ],
      {
        reverse: ["afterEach"],
      }
    );
    expect(x).toBe(0);
    l.beforeEach();
    expect(x).toBe(3);
    l.afterEach();
    expect(x).toBe(0);
  });
});
