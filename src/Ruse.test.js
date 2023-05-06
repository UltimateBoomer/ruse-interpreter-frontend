import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupServer } from "msw/node"
import Ruse from "./Ruse"
import { rest } from "msw";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays result', async () => {
  render(<Ruse />);

  server.use(rest.post('/api/ruse', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: "3"
      }),
    );
  }));

  await userEvent.type(screen.getByRole('textbox'), '(+ 1 2)');
  await userEvent.click(screen.getByText('Run'));

  expect(screen.getByRole('paragraph')).toHaveTextContent('3');
})