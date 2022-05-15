/*



The Javascript code below implements a simple in-memory database to satisfy the following specifications:



* Multiple databases can be created.

* Each database can have multiple tables.

* Each table can have multiple columns of type 'int' or 'string';

* Data validation must be done when inserting data. Integer values must be between -999 and +999. Strings cannot exceed 255 characters.

* Data can be filtered by one or more columns.



Examples are as follows:



// Create a new database

let db = new DB();



// Create a new table called 'fruit' with columns 'name' (string) and 'quantity' (int)

db.createTable('fruit', { name: 'string', quantity: 'int' }); 



// Access to table 'fruit'

let table = db.getTable('fruit');



// Insert records to table

table.insertRecords({ name: 'Apple', quantity: 20 });

table.insertRecords({ name: 'Banana', quantity: 25 });



// Return all records

table.getAllRecords();



// Filter records by name

table.filterRecords({ name: 'Apple' });





Your assignment is to write the test code that checks whether the code below satisfies the specifications.



You can write your tests in pure JavaScript or use a test framework of your choice.



*/

function DB() {
  this.tables = {};
}

DB.prototype.createTable = function (name, columns) {
  this.tables[name] = new TABLE(columns);
};

DB.prototype.getTable = function (name) {
  return this.tables[name];
};

function TABLE(columns) {
  this.columns = columns;

  this.rows = [];
}

TABLE.prototype.insertRecords = function (values) {
  // Returns false on error, true on success

  for (let k in values) {
    if (this.columns[k] === "string" && values[k].length > 255) {
      console.log(k + " must be 255 characters or less");

      return false;
    } else if (
      this.columns[k] === "int" &&
      (values[k] < -999 || values[k] > 999)
    ) {
      console.log(k + " out of range");

      return false;
    }
  }
  this.rows.push(values);

  return true;
};

TABLE.prototype.getAllRecords = function () {
  return this.rows;
};

TABLE.prototype.filterRecords = function (filter) {
  let matches = [];

  // For each row, check if all filter conditions are met

  for (let i = 0, len = this.rows.length; i < len; i++) {
    let numFilters = 0;

    let numMatched = 0;

    for (let k in filter) {
      if (this.rows[i][k] === filter[k]) {
        numMatched++;
      }

      numFilters++;
    }

    if (numFilters === numMatched) {
      matches.push(this.rows[i]);
    }
  }

  return matches;
};

///*************************Tests*******************************************

var database = new DB();
//Checks if the database can be created
function CreatingADatabase_Test() {
  if (database && typeof database.tables === "object") {
    console.log("Creating A Database = Pass");
  } else {
    console.log("Creating A Database = Fail");
  }
}

//Checks if multiple databases can be created
function CreatingMultipleDatabases_Test() {
  var second_database = new DB();
  if (
    database &&
    typeof database.tables === "object" &&
    second_database &&
    typeof second_database.tables === "object"
  ) {
    console.log("Creating Multiple Databases = Pass");
  } else {
    console.log("Creating Multiple Databases = Fail");
  }
}

//Checks if a table can be created in a database
function CreatingATable_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  if (database.tables["fruit"]) {
    console.log("Creating A Table = Pass");
  } else {
    console.log("Creating A Table = Fail");
  }
}

//Checks if multiple tables can be created in a database
function CreatingMultipleTables_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.createTable("vegetable", { name: "string", quantity: "int" });

  if (database.tables["fruit"] && database.tables["vegetable"]) {
    console.log("Creating Multiple Tables = Pass");
  } else {
    console.log("Creating Multiple Tables = Fail");
  }
}

//Checks if a table can be created with one attribute
function CreatingATablewithOneAttribute_Test() {
  database.createTable("fruit", { name: "string" });
  if (database.tables["fruit"]) {
    console.log("Creating Multiple Tables = Pass");
  } else {
    console.log("Creating Multiple Tables = Fail");
  }
}

//Checks if a table can be created with multiple attributes
function CreatingATablewithMultipleAttributes_Test() {
  database.createTable("fruit", {
    name: "string",
    quantity: "int",
    category: "string",
  });
  if (database.tables["fruit"]) {
    console.log("Creating A Table with Multiple Attributes = Pass");
  } else {
    console.log("Creating A Table with Multiple Attributes = Fail");
  }
}

//Checks if a table can be created with float typed attribute
function CreatingATablewithFloatTypedAttribute_Test() {
  database.createTable("fruit", { name: "string", cost: "float" });
  if (database.tables["fruit"]) {
    console.log("Creating A Table with Float typed Attribute = Pass");
  } else {
    console.log("Creating A Table with Float typed Attribute = Fail");
  }
}

//Checks if a value can be added to the table with positive values
//Boundary Value Testing
function AddingthePositiveIntegerValuetotheTable_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  var data998 = database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 998,
  });
  var data999 = database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 999,
  });
  var data1000 = database.tables["fruit"].insertRecords({
    name: "Strawberry",
    quantity: 1000,
  });
  if (data998) {
    console.log("Adding the 998 Integer Value to the Table = Pass");
  } else {
    console.log("Adding the 998 Integer Value to the Table = Fail");
  }
  if (data999) {
    console.log("Adding the 999 Integer Value to the Table = Pass");
  } else {
    console.log("Adding the 999 Integer Value to the Table = Fail");
  }
  if (data1000) {
    console.log("Adding the 1000 Integer Value to the Table = Pass");
  } else {
    console.log("Adding the 1000 Integer Value to the Table = Fail");
  }
}

//Checks if a value can be added to the table with negative values
//Boundary Value Testing
function AddingtheNegativeIntegerValuetotheTable_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  var data_998 = database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: -998,
  });
  var data_999 = database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: -999,
  });
  var data_1000 = database.tables["fruit"].insertRecords({
    name: "Strawberry",
    quantity: -1000,
  });
  if (data_998) {
    console.log("Adding the -998 Integer Value to the Table = Pass");
  } else {
    console.log("Adding the -998 Integer Value to the Table = Fail");
  }
  if (data_999) {
    console.log("Adding the -999 Integer Value to the Table = Pass");
  } else {
    console.log("Adding the -999 Integer Value to the Table = Fail");
  }
  if (data_1000) {
    console.log("Adding the -1000 Integer Value to the Table = Pass");
  } else {
    console.log("Adding the -1000 Integer Value to the Table = Fail");
  }
}

//Checks if a string's length can affect the addition
//Boundary Value Testing
function AddingtheStringValuestotheTable_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  var characterlong_254 = database.tables["fruit"].insertRecords({
    name: "fuaorbclfsdoycafweheldybdjsqhepwimpywuqjxomrerpkbekxbplvszyjjmbiiaeyahyboiicfgxefqzeiwozygkjatgxxgavsipncdjwgaysjykqfgzxfouigxmiavngfnrsilfdikxgfxsypnagdjvonmsymresozuhdfqvsnqjvjpvavupugwdqjlectcmahudjnsldhemldsxjtyibvlrladvxrjoufuxkkpnbzivptolnrohwqjbgb",
    quantity: 20,
  });
  var characterlong_255 = database.tables["fruit"].insertRecords({
    name: "qwpwoihmodjxquwvtirgirnptzaxeiaxzudqvskuzetzwdirkcwbebbvozdlxtjsnucidjbqxycpnuehcnhlrokrxgkdlcrhaixtghzdkzseeveucwmfvurtpysoddhgekbkuhylxupajzgeisndtbwucpkwinkkphfitklqftufjlubppbnfvkvexpucccohdwccnbtgcxywyfufdhbstxkfqxhloycyavwjgyjalkvwwplewptarljgxjmjvf",
    quantity: 20,
  });
  var characterlong_256 = database.tables["fruit"].insertRecords({
    name: "htwevdnqeucfuhjzzrpwqnrnhfceiacffysfookbyajyvqprlstbsjpprqulcsyhqwtfkvdtxiropecsknrqydlrcozlkcmzktxdpbwzkuunctevxsvlhoqetgubzroyboodlkrnqxfqkjpghxodhhxtvmiuqaojcmnakwxtkecfdqxlrffnlqsbyfyadogzayhycyhtsigtxwwwpjbjcvvzpcdhrpiodplsblxxnjsenzumajymsasbxzvldkiy",
    quantity: 20,
  });
  if (characterlong_254) {
    console.log("Adding the 254 character long String to the Table = Pass");
  } else {
    console.log("Adding the 254 character long String to the Table = Fail");
  }
  if (characterlong_255) {
    console.log("Adding the 255 character long String to the Table = Pass");
  } else {
    console.log("Adding the 255 character long String to the Table = Fail");
  }
  if (characterlong_256) {
    console.log("Adding the 256 character long String to the Table = Pass");
  } else {
    console.log("Adding the 256 character long String to the Table = Fail");
  }
}

//Checks if all wrong values can be added to the table
function AddingtheAllWrongValuestotheTable_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  var data = database.tables["fruit"].insertRecords({
    name: "htwevdnqeucfuhjzzrpwqnrnhfceiacffysfookbyajyvqprlstbsjpprqulcsyhqwtfkvdtxiropecsknrqydlrcozlkcmzktxdpbwzkuunctevxsvlhoqetgubzroyboodlkrnqxfqkjpghxodhhxtvmiuqaojcmnakwxtkecfdqxlrffnlqsbyfyadogzayhycyhtsigtxwwwpjbjcvvzpcdhrpiodplsblxxnjsenzumajymsasbxzvldkiygwmkfrrezfndcgczvacwrhuubawhscqcsonsavdslctpjshlbpqtsyvauzavewabwmvzfzggjmfioeciahqhabcaccymnfbmhamgbcdbrnpecqtllditutclxexmztwmbaypvgdfwyddqprxohbeczuilaz",
    quantity: 1500,
  });
  if (data) {
    console.log("Adding the all wrong values to the Table = Pass");
  } else {
    console.log("Adding the all wrong values to the Table = Fail");
  }
}

//Checks if all wrong attributes can be added to the table
function AddingADataWithWrongAttributes_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  var data = database.tables["fruit"].insertRecords({
    name: "Apple",
    cost: 15,
  });
  if (data) {
    console.log("Adding the all wrong values to the Table = Pass");
  } else {
    console.log("Adding the all wrong values to the Table = Fail");
  }
}

//Checks if all records can be listed
function GettingAlltheRecordsofATable_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });

  var list = database.tables["fruit"].getAllRecords();
  console.log(list);
  if (list) {
    console.log("Getting All the Records of A Table = Pass");
  } else {
    console.log("Getting All the Records of A Table = Fail");
  }
}

//Checks if an existing string data can be filtered
function FilteringanExistingStringData_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({ name: "Apple" });
  if (foundData.length === 1) {
    ///We know the length for testing
    for (let i = 0; i < foundData.length; i++) {
      if (foundData[i].name !== "Apple") {
        console.log("Filtering an Existing String Data = Fail");
        return;
      }
    }
    console.log("Filtering an Existing String Data = Pass");
  } else {
    console.log("Filtering an Existing String Data = Fail");
  }
}

//Checks if a nonexistent string data can be filtered
function FilteringaNonexistentStringData_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({
    name: "Strawberry",
  });
  console.log(foundData);
  if (foundData.length === 0) {
    console.log("Filtering a Nonexistent String Data = Pass");
  } else {
    console.log("Filtering a Nonexistent String Data = Fail");
  }
}

//Checks if an existing integer data can be filtered
function FilteringanExistingIntegerData_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({ quantity: 15 });
  if (foundData.length === 1) {
    ///We know the length for testing
    for (let i = 0; i < foundData.length; i++) {
      if (foundData[i].quantity !== 15) {
        console.log("Filtering an Existing String Data = Fail");
        return;
      }
    }
    console.log("Filtering an Existing Integer Data = Pass");
  } else {
    console.log("Filtering an Existing Integer Data = Fail");
  }
}

//Checks if a nonexistent integer data can be filtered
function FilteringaNonexistentIntegerData_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({
    quantity: 40,
  });
  if (foundData.length === 0) {
    console.log("Filtering a Nonexistent Integer Data = Pass");
  } else {
    console.log("Filtering a Nonexistent Integer Data = Fail");
  }
}

//Checks if a nonexistent attribute can be filtered
function FilteringaNonexistentAttribute_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({
    cost: 15,
  });
  if (foundData.length === 0) {
    console.log("Filtering a Nonexistent Attribute = Pass");
  } else {
    console.log("Filtering a Nonexistent Attribute = Fail");
  }
}

//Checks if an existing data with two attribute can be filtered
function FilteringanExistingDatawithTwoAttribute_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({
    name: "Apple",
    quantity: 15,
  });
  if (foundData.length === 1) {
    ///We know the length for testing
    for (let i = 0; i < foundData.length; i++) {
      if (foundData[i].name !== "Apple" && foundData[i].quantity !== 15) {
        console.log("Filtering an Existing Data with Two Attribute = Fail");
        return;
      }
    }
    console.log("FFiltering an Existing Data with Two Attribute = Pass");
  } else {
    console.log("Filtering an Existing Data with Two Attribute = Fail");
  }
}

//Checks if a data with one true and one false value can be filtered (Name true, quantity false)
function FilteringwithOneTrueandOneFalseAttribute_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({
    name: "Apple",
    quantity: 20,
  });
  if (foundData.length > 0) {
    console.log("Filtering with One True and One False Attribute = Pass");
  } else {
    console.log("Filtering with One True and One False Attribute = Fail");
  }
}

//Checks if a data with one true and one false value can be filtered (Name false, quantity true)
function FilteringwithOneFalseandOneTrueAttribute_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({
    name: "Strawberry",
    quantity: 15,
  });
  if (foundData.length > 0) {
    console.log("Filtering with One False and One True Attribute = Pass");
  } else {
    console.log("Filtering with One False and One True Attribute = Fail");
  }
}

//Checks if a nonexistent data with two attributes can be filtered
function FilteringNonexistentDatawithTwoAttributes_Test() {
  database.createTable("fruit", { name: "string", quantity: "int" });
  database.tables["fruit"].insertRecords({
    name: "Apple",
    quantity: 15,
  });
  database.tables["fruit"].insertRecords({
    name: "Pear",
    quantity: 30,
  });
  var foundData = database.tables["fruit"].filterRecords({
    name: "Strawberry",
    quantity: 40,
  });
  if (foundData.length > 0) {
    console.log("Filtering Nonexistent Data with Two Attributes = Pass");
  } else {
    console.log("Filtering Nonexistent Data with Two Attributes = Fail");
  }
}

/*

CreatingADatabase_Test();
CreatingMultipleDatabases_Test();
CreatingATable_Test();
CreatingMultipleTables_Test();
CreatingATablewithOneAttribute_Test();
CreatingATablewithMultipleAttributes_Test();
CreatingATablewithFloatTypedAttribute_Test();
AddingthePositiveIntegerValuetotheTable_Test();
AddingtheNegativeIntegerValuetotheTable_Test();
AddingtheStringValuestotheTable_Test();
AddingtheAllWrongValuestotheTable_Test();
AddingADataWithWrongAttributes_Test();
GettingAlltheRecordsofATable_Test();
FilteringanExistingStringData_Test();
FilteringaNonexistentStringData_Test();
FilteringanExistingIntegerData_Test();
FilteringaNonexistentStringData_Test();
FilteringaNonexistentAttribute_Test();
FilteringanExistingDatawithTwoAttribute_Test();
FilteringwithOneTrueandOneFalseAttribute_Test();
FilteringwithOneFalseandOneTrueAttribute_Test();
FilteringNonexistentDatawithTwoAttributes_Test();


*/
