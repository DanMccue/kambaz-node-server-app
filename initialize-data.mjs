import "dotenv/config";
import mongoose from "mongoose";
import "./kambaz/users/model.mjs";
import "./kambaz/courses/model.mjs";
import "./kambaz/enrollments/model.mjs";
import "./kambaz/assignments/model.mjs";

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

const users = [
  { _id: "123", username: "iron_man", password: "stark123", firstName: "Tony", lastName: "Stark", email: "tony@stark.com", dob: "1970-05-29T00:00:00.000Z", role: "FACULTY", loginId: "001234561S", section: "S101", lastActivity: "2020-10-01", totalActivity: "10:21:32" },
  { _id: "234", username: "dark_knight", password: "wayne123", firstName: "Bruce", lastName: "Wayne", email: "bruce@wayne.com", dob: "1972-02-19", role: "STUDENT", loginId: "001234562S", section: "S101", lastActivity: "2020-11-02", totalActivity: "15:32:43" },
  { _id: "345", username: "black_widow", password: "romanoff123", firstName: "Natasha", lastName: "Romanoff", email: "natasha@avengers.com", dob: "1984-11-22", role: "TA", loginId: "001234564S", section: "S101", lastActivity: "2020-11-05", totalActivity: "13:23:34" },
  { _id: "456", username: "thor_odinson", password: "mjolnir123", firstName: "Thor", lastName: "Odinson", email: "thor@asgard.com", dob: "0982-05-25", role: "STUDENT", loginId: "001234565S", section: "S101", lastActivity: "2020-12-01", totalActivity: "11:22:33" },
  { _id: "567", username: "hulk_smash", password: "banner123", firstName: "Bruce", lastName: "Banner", email: "bruce@avengers.com", dob: "1969-12-18", role: "STUDENT", loginId: "001234566S", section: "S101", lastActivity: "2020-12-01", totalActivity: "22:33:44" },
  { _id: "678", username: "ring_bearer", password: "shire123", firstName: "Frodo", lastName: "Baggins", email: "frodo@shire.com", dob: "1368-09-22", role: "FACULTY", loginId: "001234567S", section: "S101", lastActivity: "2020-12-02", totalActivity: "44:33:22" },
  { _id: "789", username: "strider", password: "aragorn123", firstName: "Aragorn", lastName: "Elessar", email: "aragorn@gondor.com", dob: "2931-03-01", role: "TA", loginId: "001234568S", section: "S101", lastActivity: "2020-12-04", totalActivity: "12:23:34" },
  { _id: "890", username: "elf_archer", password: "legolas123", firstName: "Legolas", lastName: "Greenleaf", email: "legolas@mirkwood.com", dob: "2879-07-15", role: "STUDENT", loginId: "001234569S", section: "S101", lastActivity: "2020-11-11", totalActivity: "21:32:43" },
  { _id: "777", username: "ada", password: "123", firstName: "Ada", lastName: "Lovelace", email: "ada@lovelace.com", dob: "1815-12-15", role: "ADMIN", loginId: "002143650S", section: "S101", lastActivity: "1852-11-27", totalActivity: "21:32:43" },
];

const courses = [
  {
    _id: "RS101", name: "Rocket Propulsion", number: "RS4550", credits: 4,
    description: "This course provides an in-depth study of the fundamentals of rocket propulsion, covering topics such as propulsion theory, engine types, fuel chemistry, and the practical applications of rocket technology. Designed for students with a strong background in physics and engineering, the course includes both theoretical instruction and hands-on laboratory work",
    modules: [
      { _id: "M101", name: "Introduction to Rocket Propulsion", description: "Basic principles of rocket propulsion and rocket engines.", lessons: [
        { _id: "L101", name: "History of Rocketry", description: "A brief history of rocketry and space exploration." },
        { _id: "L102", name: "Rocket Propulsion Fundamentals", description: "Basic principles of rocket propulsion." },
        { _id: "L103", name: "Rocket Engine Types", description: "Overview of different types of rocket engines." },
      ]},
      { _id: "M102", name: "Fuel and Combustion", description: "Understanding rocket fuel, combustion processes, and efficiency.", lessons: [
        { _id: "L201", name: "Rocket Fuel", description: "Overview of different types of rocket fuels." },
        { _id: "L202", name: "Combustion Processes", description: "Understanding combustion processes and efficiency." },
        { _id: "L203", name: "Combustion Instability", description: "Understanding combustion instability and mitigation." },
      ]},
      { _id: "M103", name: "Nozzle Design", description: "Principles of rocket nozzle design and performance optimization.", lessons: [
        { _id: "L301", name: "Nozzle Design", description: "Overview of different types of rocket nozzles." },
        { _id: "L302", name: "Nozzle Performance", description: "Understanding nozzle performance and efficiency." },
        { _id: "L303", name: "Nozzle Optimization", description: "Optimizing nozzle design for specific applications." },
      ]},
    ],
  },
  {
    _id: "RS102", name: "Aerodynamics", number: "RS4560", credits: 3,
    description: "This course offers a comprehensive exploration of aerodynamics, focusing on the principles and applications of airflow and its effects on flying objects. Topics include fluid dynamics, airfoil design, lift and drag forces, and the aerodynamic considerations in aircraft design. The course blends theoretical learning with practical applications, suitable for students pursuing a career in aeronautics or astronautics engineering.",
    modules: [
      { _id: "M201", name: "Fundamentals of Aerodynamics", description: "Basic aerodynamic concepts and fluid dynamics principles.", lessons: [] },
      { _id: "M202", name: "Subsonic and Supersonic Flow", description: "Understanding subsonic and supersonic aerodynamic behaviors.", lessons: [] },
      { _id: "M203", name: "Aerodynamic Heating", description: "Study of aerodynamic heating and thermal protection systems.", lessons: [] },
    ],
  },
  {
    _id: "RS103", name: "Spacecraft Design", number: "RS4570", credits: 4,
    description: "This course delves into the principles and practices of spacecraft design, offering students a detailed understanding of the engineering and technology behind spacecraft systems. Key topics include spacecraft structure, propulsion, power systems, thermal control, and payload integration. Emphasizing both theoretical concepts and practical skills, the course prepares students for careers in the space industry, with a focus on innovative design and problem-solving in the context of current and future space missions",
    modules: [
      { _id: "M301", name: "Spacecraft Structural Design", description: "Fundamentals of designing spacecraft structures and materials selection.", lessons: [] },
      { _id: "M302", name: "Orbital Mechanics", description: "Understanding orbital dynamics and mission planning.", lessons: [] },
      { _id: "M303", name: "Spacecraft Systems Engineering", description: "Overview of spacecraft systems and subsystems engineering.", lessons: [] },
    ],
  },
  { _id: "RS104", name: "Organic Chemistry", number: "CH1230", credits: 3, description: "Organic Chemistry is an in-depth course that explores the structure, properties, composition, and reactions of organic compounds and materials.", modules: [] },
  { _id: "RS105", name: "Inorganic Chemistry", number: "CH1240", credits: 3, description: "Inorganic Chemistry focuses on the properties, structures, and behaviors of inorganic and organometallic compounds.", modules: [] },
  { _id: "RS106", name: "Physical Chemistry", number: "CH1250", credits: 3, description: "Physical Chemistry merges the principles of physics and chemistry to understand the physical properties of molecules, the forces that act upon them, and the chemical reactions they undergo.", modules: [] },
  { _id: "RS107", name: "Ancient Languages and Scripts of Middle-earth", number: "ME101", credits: 3, description: "This course offers an exploration of the ancient languages and scripts found throughout Middle-earth, including Elvish (Sindarin and Quenya), Dwarvish (Khuzdul), and the Black Speech of Mordor.", modules: [] },
  { _id: "RS108", name: "Wizards, Elves, and Men: Inter-species Diplomacy in Middle-earth", number: "ME102", credits: 4, description: "This course explores the complex relationships and diplomatic interactions among the different races of Middle-earth: Elves, Men, Dwarves, and Wizards.", modules: [] },
];

const enrollments = [
  { _id: "1", user: "123", course: "RS101" },
  { _id: "2", user: "234", course: "RS101" },
  { _id: "3", user: "345", course: "RS101" },
  { _id: "4", user: "456", course: "RS101" },
  { _id: "5", user: "567", course: "RS101" },
  { _id: "6", user: "234", course: "RS102" },
  { _id: "7", user: "789", course: "RS102" },
  { _id: "8", user: "890", course: "RS102" },
  { _id: "9", user: "123", course: "RS102" },
];

const assignments = [
  { _id: "A101", title: "Propulsion Assignment", course: "RS101", points: 100, dueDate: "2024-05-13", availableDate: "2024-05-06" },
  { _id: "A102", title: "Combustion Analysis", course: "RS101" },
  { _id: "A103", title: "Nozzle Design Project", course: "RS101" },
  { _id: "A201", title: "Aerodynamics Quiz", course: "RS102" },
  { _id: "A202", title: "Flow Analysis", course: "RS102" },
  { _id: "A203", title: "Heating Analysis", course: "RS102" },
  { _id: "A301", title: "Structural Design Task", course: "RS103" },
  { _id: "A302", title: "Orbital Calculations", course: "RS103" },
  { _id: "A303", title: "Systems Engineering Exam", course: "RS103" },
];

async function seed() {
  console.log(`Connecting to ${CONNECTION_STRING} ...`);
  await mongoose.connect(CONNECTION_STRING);
  console.log("Connected.\n");

  const db = mongoose.connection.db;

  const collections = ["users", "courses", "enrollments", "assignments"];
  for (const name of collections) {
    const exists = await db.listCollections({ name }).hasNext();
    if (exists) {
      await db.dropCollection(name);
      console.log(`Dropped existing "${name}" collection.`);
    }
  }

  const User = mongoose.model("UserModel");
  const Course = mongoose.model("CourseModel");
  const Enrollment = mongoose.model("EnrollmentModel");
  const Assignment = mongoose.model("AssignmentModel");

  await User.insertMany(users);
  console.log(`Inserted ${users.length} users.`);

  await Course.insertMany(courses);
  console.log(`Inserted ${courses.length} courses (with embedded modules).`);

  await Enrollment.insertMany(enrollments);
  console.log(`Inserted ${enrollments.length} enrollments.`);

  await Assignment.insertMany(assignments);
  console.log(`Inserted ${assignments.length} assignments.`);

  console.log("\nDone! Database seeded successfully.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
