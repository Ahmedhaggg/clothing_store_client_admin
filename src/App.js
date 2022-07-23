import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux";
import Store from "./store/index";
import Login from "./views/login";
import React from "react";
import Layout from "./layout/default";
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import Dashboard from "./views/dashboard";
import Categories from "./views/categories";
import EditCategory from "./views/categories/edit";
import CreateCategory from "./views/categories/create";
import Category from "./views/categories/category";

const theme = createTheme();


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/*" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<div>products</div>} />
              <Route path="categories/*">
                <Route index element={<Categories />} />
                <Route path="create" element={<CreateCategory />} />
                <Route path=":id" element={<Category />} />
                <Route path=":id/edit" element={<EditCategory />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}


/**
 * 
 * <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
        </Routes>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<div>dashboard</div>} />
            <Route path="/products" element={<div>products</div>} />
            <Route path="/categories" element={<div>categories</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
 */
export default App;
