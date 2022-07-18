import React from 'react'
import './table.css'

const IssueBoard = () => {
    return (
        <div class='summaryBoard'>
            <table class='issueTable'>
                <tr>
                    <th class='issueColumn'>Issue List</th>
                    <th class='issueColumn'>Story Points</th>
                    <th class='issueColumn'>Priority</th>
                    <th class='issueColumn'>No.of Assignee</th>
                </tr>
                <tr>
                    <td>
                        <div class='column1'>
                            <form>
                                <input id="CG-695" name= "CG-695" value="CG-695"></input>
                                <input id="CG-418" name= "CG-418" value="CG-418"></input>
                            </form>
                        </div>
                    </td>
                    <td>
                        <div class='column2'>
                            <form>
                                <input id="SP_CG-695" name= "SP_CG-695" value="5"></input>
                                <input id="SP_CG-418" name= "SP_CG-418" value="2"></input>
                            </form>
                        </div>
                    </td>
                    <td>
                        <div class='column3'>
                            <form>                                
                                <input id="prior_CG-695" name= "prior_CG-695" value="Minor"></input>
                                <input id="prior_CG-418" name= "prior_CG-418" value="Trivial"></input>
                            </form>
                        </div>
                    </td>
                    <td>
                        <div class='column4'>
                            <form>
                                <input id="assgin_CG-695" name= "assgin_CG-695" value="1"></input>
                                <input id="assgin_CG-418" name= "assgin_CG-418" value="1"></input>
                            </form>
                        </div>
                    </td>
                </tr>
            </table>


            {/* <div>
                <table>
                    <tr>
                        <th class='issueColumn'>Issue List</th>
                        <th class='issueColumn'>Story Points</th>
                        <th class='issueColumn'>Priority</th>
                        <th class='issueColumn'>No.of Assignee</th>
                    </tr>
                    <tr>
                        <td class='issueColumn'>CG-695</td>
                        <td class='issueColumn'>5</td>
                        <td class='issueColumn'>Minor</td>
                        <td class='issueColumn'>1</td>
                    </tr>
                    <tr>
                        <td class='issueColumn'>CG-418</td>
                        <td class='issueColumn'>2</td>
                        <td class='issueColumn'>Trivial</td>
                        <td class='issueColumn'>1</td>
                    </tr>
                    <tr>
                        <td class='issueColumn'>CG-437</td>
                        <td class='issueColumn'>9</td>
                        <td class='issueColumn'>Critical</td>
                        <td class='issueColumn'>2</td>
                    </tr>
                    <tr>
                        <td class='issueColumn'>CG-388</td>
                        <td class='issueColumn'>10</td>
                        <td class='issueColumn'>Critical</td>
                        <td class='issueColumn'>1</td>
                    </tr>
                </table>
            </div> */}
        </div>
        
        )
}

export default IssueBoard;