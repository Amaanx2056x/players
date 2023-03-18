import React from "react";
import { Card, Col } from "react-bootstrap";
import dateFormat from "dateformat";

const PlayerCard = ({ playerData }) => {
  return playerData.length <= 0 ? (
    <div>No data</div>
  ) : (
    playerData
      .slice()
      .sort((a, b) => Number(a.Value) - Number(b.Value))
      .map((item) => (
        <Col md={6} key={item.Id}>
          <Card className="m-2">
            <div className="m-2">
              <Card.Img
                variant="top"
                src={`./player-images/${item.Id}.jpg`}
                width="100px"
                height="300px"
              />
            </div>

            <Card.Body>
              <Card.Title>{item.PFName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.SkillDesc}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                ${item.Value}
              </Card.Subtitle>

              <Card.Text>
                Upcoming Match:{" "}
                <span className="mb-2 text-muted">
                  {item.UpComingMatchesList[0].CCode} vs{" "}
                  {item.UpComingMatchesList[0].VsCCode}
                </span>{" "}
                on{" "}
                {dateFormat(
                  item.UpComingMatchesList[0].MDate,
                  "dd-mm-yyyy h:MM:ss"
                )}
              </Card.Text>
            </Card.Body>

            <Card.Body></Card.Body>
          </Card>
        </Col>
      ))
  );
};

export default PlayerCard;
