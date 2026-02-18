const express = require("express");
const path = require("path");
const fileHandler = require("./modules/fileHandler");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // ✅ important

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ================= DASHBOARD =================
app.get("/", async (req, res) => {
  const employees = await fileHandler.readData();

  let totalSalary = 0;
  let totalTax = 0;
  let totalNet = 0;

  employees.forEach(emp => {
    const tax = emp.salary * 0.10;
    totalSalary += emp.salary;
    totalTax += tax;
    totalNet += (emp.salary - tax);
  });

  res.render("index", {
    employees,
    totalEmployees: employees.length,
    totalSalary,
    totalTax,
    totalNet
  });
});


// ================= ADD PAGE =================
app.get("/add", (req, res) => {
  res.render("add");
});


// ================= ADD EMPLOYEE =================
app.post("/add", async (req, res) => {
  const employees = await fileHandler.readData();

  const newEmployee = {
    id: Date.now(),
    name: req.body.name,
    department: req.body.department,
    salary: Number(req.body.salary)
  };

  if (!newEmployee.name || newEmployee.salary < 0) {
    return res.redirect("/");
  }

  employees.push(newEmployee);
  await fileHandler.writeData(employees);

  res.redirect("/");
});


// ================= DELETE =================
app.get("/delete/:id", async (req, res) => {
  let employees = await fileHandler.readData();
  employees = employees.filter(emp => emp.id != req.params.id);
  await fileHandler.writeData(employees);
  res.redirect("/");
});


// ================= EDIT PAGE =================
app.get("/edit/:id", async (req, res) => {
  const employees = await fileHandler.readData();
  const employee = employees.find(emp => emp.id == req.params.id);
  res.render("edit", { employee });
});


// ================= UPDATE =================
app.post("/edit/:id", async (req, res) => {
  const employees = await fileHandler.readData();
  const index = employees.findIndex(emp => emp.id == req.params.id);

  if (index === -1) return res.redirect("/");

  employees[index] = {
    id: employees[index].id,
    name: req.body.name,
    department: req.body.department,
    salary: Number(req.body.salary)
  };

  await fileHandler.writeData(employees);
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
