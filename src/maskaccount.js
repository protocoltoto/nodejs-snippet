const data = "1112223334";

const masking = async (data, prefix, suffix, maskchar) => {
  if (typeof data !== "string") {
    throw new Error("data type not support!");
  }

  if (typeof prefix !== "number" || typeof suffix !== "number") {
    throw new Error("data type not support!");
  }

  return Array.from(data)
    .map((element, index) => {
      if (index < prefix - 1) {
        return element;
      }
      if (index > prefix - 1 && index < data.length - suffix) {
        return maskchar;
      }
      return element;
    })
    .join("");
};

const mainproc = async () => {
  try {
    console.log(await masking(data, 3, 4, "*"));
    console.log(await masking(data, 8, 2, "x"));
  } catch (error) {
    console.error("maskaccount", error);
  }
};

mainproc();
