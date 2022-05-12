import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";
import Header from "./components/Header";
import CompanyTable from "./components/CompanyTable";

// THIS WILL COME FROM MONGO VIA PROPS
const none = [];
const companies = [
  {
    id: "1",
    name: "company one",
    date: "05-11-2022",
    status: true,
    comments: "nice company",
  },
  { id: "2", name: "meore", date: "05-12-2022", status: true, comments: "" },
  {
    id: "3",
    name: "Kaks & Seysi",
    date: "04-20-2022",
    status: false,
    comments: "Dedis muteli movtkan",
  },
  {
    id: "4",
    name: "company Four",
    date: "03-11-2022",
    status: true,
    comments: "lets wait",
  },
  {
    id: "5",
    name: "Statsman",
    date: "12-30-2021",
    status: true,
    comments: "interviewed twice",
  },
  {
    id: "6",
    name: "SPACEKATaZ",
    date: "12-25-2021",
    status: false,
    comments: "Fucking millennials",
  },
];

const App = () => {
  // Local State
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [addCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false);
  const [newCompanyTitle, setNewCompanyTitle] = useState("");
  const [newComments, setNewComments] = useState("");
  const [editCompanyDialogOpen, setEditCompanyDialogOpen] = useState(false);
  const [editedCompanyTitle, setEditedCompanyTitle] = useState("");
  const [editedComments, setEditedComments] = useState("");
  const [rejected, setRejected] = useState(false);
  const [deleteCompanyDialogOpen, setDeleteCompanyDialogOpen] = useState(false);
  const [deletedCompanyTitle, setDeletedCompanyTitle] = useState("");

  // Handler Functions
  // Filters through existing company names
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  // ADDING NEW COMPANY
  // Opens add new company modal
  const handleAddCompanyModalOpen = () => {
    setAddCompanyDialogOpen(true);
  };

  // Closes add new company modal
  const handleAddCompanyModalClose = () => {
    setAddCompanyDialogOpen(false);
    setNewCompanyTitle("");
    setNewComments("");
  };

  const handleNewCompanyTitleChange = (event) => {
    setNewCompanyTitle(event.target.value);
  };

  const handleNewCommentsChange = (event) => {
    setNewComments(event.target.value);
  };

  const handleSubmitNewCompany = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAddCompanyDialogOpen(false);
      console.log("TITLE: ", newCompanyTitle); // test
      console.log("COMMENTS: ", newComments); // test
      setNewCompanyTitle("");
      setNewComments("");
    }, 2000);
  };

  // EDITING EXISTING COMPANY
  // Opens edit existing company modal
  const handleEditCompanyModalOpen = (id) => {
    setEditCompanyDialogOpen(true);
    console.log(id); // test
    // finds a row by its ID and populates fields
    let currentCompany = companies.find((company) => company.id === id);
    setEditedCompanyTitle(currentCompany.name);
    setEditedComments(currentCompany.comments);
    setRejected(currentCompany.status);
  };
  // Closes edit existing company modal
  const handleEditCompanyModalClose = () => {
    setEditCompanyDialogOpen(false);
  };

  const handleEditedCompanyTitleChange = (event) => {
    setEditedCompanyTitle(event.target.value);
  };

  const handleEditedCommentsChange = (event) => {
    setEditedComments(event.target.value);
  };

  const handleStatusChange = (event) => {
    setRejected((prevState) => !prevState);
    console.log(rejected); // test
  };

  const handleSubmitEditedCompany = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEditCompanyDialogOpen(false);
      console.log("EDITED TITLE: ", editedCompanyTitle); // test
      console.log("EDITED COMMENTS: ", editedComments); // test
      console.log("REJECTED: ", rejected); // test
      setEditedCompanyTitle("");
      setEditedComments("");
      //setRejected(false);
    }, 2000);
  };

  // DELETING EXISTING COMPANY
  // Opens delete existing company modal. Note: id here is needed to display company name
  const handleDeleteCompanyModalOpen = (id) => {
    setDeleteCompanyDialogOpen(true);
    console.log(id); // test
    // finds a row by its ID and populates fields... TEST START
    let currentCompany = companies.find((company) => company.id === id);
    setDeletedCompanyTitle(currentCompany.name);
  };

  // Closes delete existing company modal
  const handleDeleteCompanyModalClose = () => {
    setDeleteCompanyDialogOpen(false);
  };

  const handleCompanyDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDeleteCompanyDialogOpen(false);
      console.log("DELETED COMPANY: ", deletedCompanyTitle); // test
      setDeletedCompanyTitle("");
    }, 2000);
  };

  // Ids will be attached via req.params...
  // ORDER OF APPEARANCE WILL BE SET (AT EAST TRIED) VIA MONGO TIMESTAMP... 1 VS. -1 etc
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        modalOpen={addCompanyDialogOpen}
        onAddCompanyModalOpen={handleAddCompanyModalOpen}
        onAddCompanyModalClose={handleAddCompanyModalClose}
        searchValue={searchValue}
        onSearchValueChange={handleSearchValueChange}
        newCompanyTitle={newCompanyTitle}
        onNewCompanyTitleChange={handleNewCompanyTitleChange}
        newComments={newComments}
        onNewCommentsChange={handleNewCommentsChange}
        onSubmitNewCompany={handleSubmitNewCompany}
        isLoading={isLoading}
      />
      <CompanyTable
        rows={companies}
        nameFilter={searchValue}
        open={editCompanyDialogOpen}
        onEditCompanyModalOpen={handleEditCompanyModalOpen}
        onEditCompanyModalClose={handleEditCompanyModalClose}
        editedCompanyTitle={editedCompanyTitle}
        onEditedCompanyTitleChange={handleEditedCompanyTitleChange}
        editedComments={editedComments}
        onEditedCommentsChange={handleEditedCommentsChange}
        checked={!rejected}
        onStatusChange={handleStatusChange}
        onSubmitEditedCompany={handleSubmitEditedCompany}
        deleteModalOpen={deleteCompanyDialogOpen}
        onDeleteCompanyModalOpen={handleDeleteCompanyModalOpen}
        onDeleteCompanyModalClose={handleDeleteCompanyModalClose}
        deletedCompanyTitle={deletedCompanyTitle}
        onDeleteCompany={handleCompanyDelete}
        isLoading={isLoading}
      />
    </ThemeProvider>
  );
};

export default App;
