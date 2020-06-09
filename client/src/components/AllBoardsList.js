import React, { useContext, useEffect, useState } from "react";

import { Typography, makeStyles } from "@material-ui/core";

import { BoardContext } from "../contexts";
import BoardCard from "./BoardCard";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  h5Label: {
    margin: "2rem 0.5rem 1rem",
    padding: "0 1rem",
  },
  boardsWrapper: {
    marginLeft: "50px",
    marginRight: "50px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

function AllBoardsList() {
  const classes = useStyles();

  const { fetchAllBoards, allBoards, allBoardsLoading } = useContext(
    BoardContext
  );

  const history = useHistory();

  const [boardId, setBoardId] = useState("");

  useEffect(() => {
    fetchAllBoards();
  }, []);

  useEffect(() => {
    if (boardId !== "") history.push("/board/" + boardId);
  }, [boardId]);

  return (
    <React.Fragment>
      {allBoardsLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <React.Fragment>
          <Typography variant="h5" className={classes.h5Label}>
            All Reflex Boards:
          </Typography>
          <div className={classes.boardsWrapper}>
            {allBoards.map((board, index) => (
              <BoardCard
                key={index}
                title={board.title}
                onClick={() => setBoardId(board._id)}
                author={board.userId}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default AllBoardsList;