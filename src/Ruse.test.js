import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import Ruse from "./Ruse"
import { rest } from "msw";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays result", async () => {
  server.use(
    rest.get("/api/ruse/langs", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(["A"])
      );
    }),
    rest.post("/api/ruse/interp", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: "result"
        }),
      );
    })
  );

  render(<Ruse />);
  

  await userEvent.type(screen.getByRole("textbox"), "test");
  await userEvent.click(screen.getByText("Run"));

  expect(screen.getByRole("paragraph")).toHaveTextContent("result");
})
