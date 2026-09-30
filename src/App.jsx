import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import WelcomePage from "./pages/WelcomePage/WelcomePage";

import BookList from "./pages/books/BookList";
import AddBook from "./pages/books/AddBook";
import BookPageForEdit from "./pages/books/BookPageForEdit";
import BookDetails from "./pages/books/BookDetails";

import AdminLogin from "./pages/LoginSignupPages/AdminLogin";

import CreateDiscount from "./pages/Discount/CreateDiscount";
import DiscountList from "./pages/Discount/DiscountList";
import DiscountForEdit from "./pages/Discount/DiscountForEdit";

import UserList from "./pages/users/UserList";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<AdminLogin />} />
      </Routes>


      <div className="d-flex">

        <Sidebar />

        <main
          style={{
            flexGrow: 1,
            padding: "20px"
          }}
        >

          <Routes>

            <Route
              path="/admin/dashboard"
              element={<WelcomePage />}
            />

            <Route
              path="/books"
              element={<BookList />}
            />

            <Route
              path="/add/book"
              element={<AddBook />}
            />

            <Route
              path="/edit/book/:id"
              element={<BookPageForEdit />}
            />

            <Route
              path="/book/details/:id"
              element={<BookDetails />}
            />

            <Route
              path="/discounts"
              element={<DiscountList />}
            />

            <Route
              path="/add/discount"
              element={<CreateDiscount />}
            />

            <Route
              path="/edit/discount/:id"
              element={<DiscountForEdit />}
            />

            <Route
              path="/users"
              element={<UserList />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;