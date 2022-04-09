import { Divider, Spin } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import map from "lodash/map";
import get from "lodash/get";
import { useDispatch } from "react-redux";
import FolderIconSVG from "../../common/FolderIconSVG";
import { fetchDashboardCollection } from "../../redux/actions/dashboardActions";
import EmptyState from "../../common/emptyState/emptyState";
import noDataImage from "../../assets/images/study-not-data.svg";

const CollectionSection = (props: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [collections, setCollections] = useState(null);

  const getDashboardCollections = () => {
    setLoading(true);
    dispatch(fetchDashboardCollection())
      .then((result: any) => {
        setCollections(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDashboardCollections();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="right-section">
        <h4 className="title4">Most Studied Collections</h4>
        <Divider />
        {get(collections, "most_used_collections", []).length === 0 && (
          <EmptyState
            imgUrl={noDataImage}
            description="No Used collection exists"
            title=" "
            imgStyle="empty-image"
          />
        )}
        {map(
          get(collections, "most_used_collections", []),
          (collection: any, index) => (
            <Link
              className="collection-card"
              key={index}
              to={get(collection, "url")}
            >
              <div className="icon-folder">
                <FolderIconSVG
                  withUserStyle={"folderUser"}
                  fillColor={
                    get(collection, "color")
                      ? get(collection, "color")
                      : "#503FC8"
                  }
                />
              </div>
              <div className="content-sec">
                <h4 className="title4">{get(collection, "name")}</h4>
                <p className="description">
                  {get(collection, "note_count")} notes,{" "}
                  {get(collection, "question_count")} questions
                </p>
              </div>
            </Link>
          )
        )}

        <h4 className="title4 mt-3">Recent Studied Collections</h4>
        <Divider />
        {get(collections, "recent_collections", []).length === 0 && (
          <EmptyState
            imgUrl={noDataImage}
            title=""
            description="No Recently used collection exists"
            imgStyle="empty-image"
          />
        )}
        {map(
          get(collections, "recent_collections", []),
          (collection: any, index) => (
            <Link
              className="collection-card"
              key={index}
              to={get(collection, "url")}
            >
              <div className="icon-folder">
                <FolderIconSVG
                  withUserStyle={"folderUser"}
                  fillColor={
                    get(collection, "color")
                      ? get(collection, "color")
                      : "#503FC8"
                  }
                />
              </div>
              <div className="content-sec">
                <h4 className="title4">{get(collection, "name")}</h4>
                <p className="description">
                  {get(collection, "note_count")} notes,{" "}
                  {get(collection, "question_count")} questions
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </Spin>
  );
};

export default CollectionSection;
