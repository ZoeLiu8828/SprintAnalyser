import requests
from requests.auth import HTTPBasicAuth
import json
import base64
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")

# username/email and password
auth = HTTPBasicAuth("jc107@uowmail.edu.au", "biallenchan123!@#")

header = {
    "Accept": "application/json",
    "Authorization": "Bearer Njg0NzYxOTE0NTA2Oka5mpzom6bpF9cFXZgnIo9wA9FD"
}

payload_board = {
    'startAt': 0,
    'maxResults': 1000
}

"""
================================================ # Step 1: get all boards ================================================ 
"""

def find_scrum_boards(project_keys):
    # Find projects that have scrum boards (completed)
    scrum_projects = []

    for key in project_keys:
        jboss_api = f"https://issues.redhat.com/rest/agile/1.0/board/?projectKeyOrId={key}"

        board = requests.request("GET", jboss_api, headers=header, params=payload_board).json()
        board_df = pd.json_normalize(board['values'])
        try:
            for i in range(len(board_df["type"])):
                if board_df["type"][i] == "scrum":
                    if key not in scrum_projects:
                        scrum_projects.append(key)
        except:
            pass

    return scrum_projects
    print(scrum_projects)


def save_scrum_boards_to_csv(scrum_projects):
    for key in scrum_projects:
        jboss_api = f"https://issues.redhat.com/rest/agile/1.0/board/?projectKeyOrId={key}"
        board = requests.request("GET", jboss_api, headers=header, params=payload_board).json()
        board_df = pd.json_normalize(board['values'])
        board_df = board_df[board_df["type"]=="scrum"]
        board_df.to_csv(f'jboss_{key}.csv')


def concat_csv(scrum_projects):
    csv_list = []
    for key in scrum_projects:
        csv = "jboss_" + key + ".csv"
        csv_list.append(csv)

    df = pd.concat(map(pd.read_csv, csv_list), ignore_index=True)
    df = df.drop("Unnamed: 0", axis = 1)
    df.reset_index()

    df.to_csv("jboss_all_boards.csv")


def find_sprints_and_issues(board_file):
    """
    # ================================================ # Step 2: get sprints ================================================
    """

    board_df = pd.read_csv(board_file)
    board_id = list(board_df["id"])

    headers = {
       "Accept": "application/json",
       "Authorization": auth
    }

    payload_sprint = {
    'maxResults':2000,
    'startAt':0
    }

    list1 = []
    for i in board_id:
       sprint_url = 'https://issues.redhat.com/rest/agile/1.0/board/' + f'{i}' + '/sprint'
       sprint = requests.request("GET",sprint_url ,headers=header, params=payload_sprint).json()
       print(sprint)
       try:
          list1.append(sprint['values'])
       except:
          pass

    sprint_df = pd.json_normalize(list1)

    sprint_result = pd.DataFrame()

    for i in sprint_df.index:
       sprint_df_1 = sprint_df.iloc[i].apply(pd.Series)
       sprint_df_1['board_id'] = board_df['id'][i]
       frame = [sprint_result, sprint_df_1]
       sprint_result = pd.concat(frame)

    sprint_result = sprint_result[sprint_result['id'].notna()]

    sprint_result = sprint_result.reset_index()
    sprint_result = sprint_result.drop(columns=['index'])

    sprint_result.to_csv('jboss_all_sprint.csv')

    """
    ================================================ # Step 3: get issues ================================================
    """

    # Step 3: get issues
    payload_issues = {
       'maxResults':2000
    }

    list1 = []
    for i in board_id:
       issues_url = 'https://issues.redhat.com/rest/agile/1.0/board/' + f'{i}' + '/issue'
       issues = requests.request("GET",issues_url, headers=header, params=payload_issues).json()
       try:
          list1.append(issues['issues'])
          print(issues)
       except:
          pass

    issue_df = pd.json_normalize(list1)

    issue_result = pd.DataFrame()

    for i in issue_df.index:
       issue_df_1 = issue_df.iloc[i].apply(pd.Series)
       issue_df_1['board_id'] = board_df['id'][i]
       frame = [issue_result, issue_df_1]
       issue_result = pd.concat(frame)

    issue_result = issue_result.reset_index()
    issue_result = issue_result.drop(columns=['index'])
    issue_result = issue_result[issue_result['fields.customfield_12310243'].notna()]

    issue_result.to_csv('jboss_all_issues.csv')

# Step One: Filter projects that include board type of scrum
# project_keys = ["ENTMQ", "JBADMCON", "RHBPMS", "RHBRMS", "JBCLUSTER", "JBCS", "JDF", "EMB", "JBEAP", "JBPAPP",
#                 "SOA", "JBEE", "JBEWS", "JBESB", "JBSSO", "LOGMGR", "JBLOGGING", "JBMAR", "JBMETA", "MODULES",
#                 "JBNAME", "REM3", "CMTOOL", "JBTHR", "JBTM", "JBVFS", "JWS", "JBWS", "WFK2", "ORG", "NEXUS", "JBIDE"]
#
# filter_scrums = find_scrum_boards(project_keys)

# Step Two: Save all scrum boards to one CSV file
# scrum_projects = ['ENTMQ', 'RHBPMS', 'RHBRMS', 'JBEAP', 'WFK2', 'ORG', 'NEXUS', 'JBIDE']
# board_separate_csv = save_scrum_boards_to_csv(scrum_projects)
# save_all_boards_to_one_csv = concat_csv(scrum_projects)

# Step Three: Save sprints and issues to CSV files
# run = find_sprints_and_issues("jboss_all_boards.csv")
