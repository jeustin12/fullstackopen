const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

beforeAll((done) => {
  done();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});
test("it is saved to database", async () => {
  const newBlog = {
    title: "Great developer experience",
    author: "Hector Ramos",
    url: "https://jestjs.io/blog/2017/01/30/a-great-developer-experience",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    // .set(headers)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("Great developer experience");

  //   const titles = blogsAtEnd.map((b) => b.title);
  //   expect(titles).toContain("Great developer experience");
});

test("Delete  BLOGS", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.title);
});

test("BLOGS has _id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});
test("likes get value 0 as default", async () => {
  const newBlog = {
    title: "Blazing Fast Delightful Testing",
    author: "Rick Hanlon",
    url: "https://jestjs.io/blog/2017/01/30/a-great-developer-experience",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    // .set(headers)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const added = blogsAtEnd.find((b) => b.url === newBlog.url);

  expect(added.likes).toBe(0);
});

test("fails when title or url is missing", async () => {
  const newBlog = {
    author: "Rick Hanlon",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    // .set(headers)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});
test("a blog can be edited", async () => {
  const [aBlog] = await helper.blogsInDb();

  const editedBlog = { ...aBlog, likes: aBlog.likes + 1 };

  await api.put(`/api/blogs/${aBlog.id}`).send(editedBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const edited = blogsAtEnd.find((b) => b.url === aBlog.url);
  expect(edited.likes).toBe(aBlog.likes + 1);
});

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  expect(usernames).toContain(newUser.username);
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
