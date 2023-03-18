import React, { useState, useEffect } from "react";
import { Container, Row, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectPlayers, getAllPlayers } from "./PlayerSlice";
import PlayerCard from "./PlayerCard";
import styles from "./Players.module.css";

export function PlayerBoard() {
  const playerList = useSelector(selectPlayers);
  const dispatch = useDispatch();
  let [load, setLoad] = useState(true);
  let [filtered, setFiltered] = useState({
    data: [],
    filtered_data: [],
    searchQuery: "",
  });
  useEffect(() => {
    dispatch(getAllPlayers(setLoad, setFiltered));
  }, []);
  const searchFilter = () => {
    setFiltered((prev) => ({
      ...prev,
      filtered_data: prev.data.filter((itm) => {
        for (let [, value] of Object.entries(itm)) {
          if (
            typeof value === "string" &&
            value.toLowerCase().includes(prev.searchQuery.toLowerCase())
          ) {
            return true;
          }
        }
      }),
    }));
  };
  const onEnterKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchFilter();
    }
  };

  const onSearchTextChange = (e) => {
    if (e.target.value === "") {
      setFiltered((prev) => ({
        ...prev,
        filtered_data: prev.data,
      }));
    }
    setFiltered((prev) => ({
      ...prev,
      searchQuery: e.target.value,
    }));
  };

  return (
    <Container>
      <Row>
        <FloatingLabel
          controlId="floatingInput"
          label="Press Enter to Search..."
          className="mb-3"
          value={filtered.searchQuery}
          onChange={onSearchTextChange}
          onKeyDown={onEnterKeyPress}
        >
          <Form.Control type="text" placeholder="Press Enter to Search..." />
        </FloatingLabel>

        {load ? (
          <Spinner />
        ) : (
          <PlayerCard playerData={filtered.filtered_data} />
        )}
      </Row>
    </Container>
  );
}
