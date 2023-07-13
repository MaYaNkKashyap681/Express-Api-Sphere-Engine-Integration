import App from "./app";
import UserController from "./user/user.controller";
import AuthController from "./auth/auth.controller";
import QuestionController from "./question/question.controller";


const app = new App([new AuthController(), new UserController(), new QuestionController()]);

app.listen();
