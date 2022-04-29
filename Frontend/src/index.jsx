import ForgeUI, { render,Fragment, Text, ProjectPage, GlobalPanel, IssuePanel, useProductContext, useState, useEffect } from '@forge/ui';
import api, { fetch, route } from "@forge/api";

//This function takes an issueId to call the REST API with path /rest/api/3/issue/${issueIdOrKey}/comment.
const fetchCommentsForIssue = async (issueIdOrKey) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);

  const data = await res.json();
  return data.comments;
};

const fetchBoard = async () => {
  // Get all sprints: https://velocitypredictor.atlassian.net/rest/agile/1.0/board/{boardId}/sprint
  // Get all issues: https://velocitypredictor.atlassian.net/rest/agile/1.0/board/{boardId}/issue
  const result = await api
    .asUser()
    .requestJira(route `/rest/agile/1.0/board/`);
    const data = await result.json();
    return data
}

const fetchIssues = async () => {
  const result = await api
    .asUser()
    .requestJira(route `/rest/agile/1.0/board/1/issue`)
    const data = await result.json();
    return data
}


const App = () => {
  const context = useProductContext(); //Use the UI kit hook useProductContext to get the issueId to call fetchCommentsForIssue
  const [boardInfo] = useState(async () => await fetchBoard());
  const [issueInfo] = useState(async () => await fetchIssues());
  
  // Fetch the comments for the page and log the output in the App function
  // const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));
  // console.log(`Number of comments on this issue: ${comments.length}`);

  // Connect backend with frontend
  // const [data, setData] = useState([{}])

  // useEffect(() =>{
  //   fetch("/predict").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])
  
  useEffect(async () => {
    const prediction = await fetch('127.0.0.1:5000/predict', 
    {method: 'GET', 
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer 8209eblHxDHvTNyt46FkDEA3"
      }}
    )
    }, []);
  

  //   console.log(prediction);
  
    // readPrediction => readPrediction.json();

  return (
    // <Fragment>
    //   <Text>Skeleton App for Velocity-Predictor</Text>
    //   <Text>Number of comments on this issue: {comments.length}</Text>
    // </Fragment>
    <ProjectPage>
      <Text>Skeleton App for Velocity-Predictor</Text>
      <Text>Project Key: {JSON.stringify(context.platformContext.projectKey, null, 2)}</Text>
      <Text>Board Info: {JSON.stringify(boardInfo.values, null, 2)}</Text>
      <Text>Total issues: {JSON.stringify(issueInfo.total, null, 2)}</Text>
      {/* <Text>Total issues: {JSON.stringify(prediction, null, 2)}</Text> */}
      <Text>Current Prediction: Null</Text>
    </ProjectPage>
  );
};


export const run = render(
    <App />
);
