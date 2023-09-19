import validateEnv from './utils/validateEnv';
import App from './app';
import AuthRoute from './module/auth/auth.route';
import PostRoute from './module/post/post.route';

validateEnv();

const app = new App([new AuthRoute(), new PostRoute()]);

//Listen
app.listen();
