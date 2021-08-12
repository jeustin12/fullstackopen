const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
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

afterAll(() => {
  mongoose.connection.close();
});
