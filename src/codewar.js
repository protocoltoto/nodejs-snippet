const array = [];
for (let index = 0; index < 10; index++) {
  array.push(index.toString());
}

class PaginationHelper {
  constructor(collection, itemsPerPage) {
    // The constructor takes in an array of items and a integer indicating how many
    // items fit within a single page
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }
  itemCount() {
    // returns the number of items within the entire collection
    return this.collection.length;
  }
  pageCount() {
    // returns the number of pages
    return this.collection.length / this.itemsPerPage == 0
      ? this.collection.length % this.itemsPerPage
      : (this.collection.length % this.itemsPerPage) + 1;
    Ï;
  }
  pageItemCount(pageIndex) {
    // returns the number of items on the current page. page_index is zero based.
    // this method should return -1 for pageIndex values that are out of range
    console.log(array.slice(this.itemsPerPage * (pageIndex)));
  }
  pageIndex(itemIndex) {
    // determines what page an item is on. Zero based indexes
    // this method should return -1 for itemIndex values that are out of range
  }
}

const testclass = new PaginationHelper(array, 4);
console.log("item Count:", testclass.itemCount());
console.log("page Count:", testclass.pageCount());
console.log("page Count:", testclass.pageItemCount(1));
