function returnPrivacyPolicyHTML() {
    return `
    <main class="legal_content_ctn">
        <div class="legal_content_title">
            <h1>Privacy Policy</h1>
            <img onclick="hideLegalContent()" src="../images/arrow-left-line.svg" alt="">
        </div>
        <div>
            <h2>Preamble</h2>
            <p>With the following privacy policy, we want to inform you about the types of your personal data (hereinafter also referred to as "data") that we process, 
            for what purposes, and to what extent. The privacy policy applies to all processing of personal data carried out by us, both in the context of providing our services and especially on our websites, 
            in mobile applications, and within external online presences, such as our social media profiles (hereinafter collectively referred to as the "Online Offering").<br>
            <br>
            The terms used are not gender-specific.<br>
            <br>
            As of: November 17, 2023</p>
        </div>
        <section>
            <h2>Table of Contents</h2>
            <div>
                <h2>Relevant Legal Bases</h2>
                <p>
                Relevant legal bases under the GDPR: Below you will find an overview of the legal bases of the GDPR on which we process personal data. Please note that in addition to the provisions of the GDPR, 
                national data protection regulations may apply in your or our country of residence or domicile. Furthermore, if more specific legal bases are relevant in individual cases, we will inform you of these in the privacy policy.
                    <ul>
                        <li>Consent (Art. 6(1)(a) GDPR) - The data subject has given consent to the processing of his or her personal data for one or more specific purposes.</li>
                        <li>Performance of a Contract and Pre-contractual Inquiries (Art. 6(1)(b) GDPR) - Processing is necessary for the performance of a contract to which the data subject is a party or for the implementation of pre-contractual measures taken at the data subject's request.</li>
                        <li>Legitimate Interests (Art. 6(1)(f) GDPR) - Processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data.</li>
                    </ul>
                    National data protection regulations in Germany: In addition to the data protection regulations of the GDPR, national regulations on data protection apply in Germany. This includes, in particular, the Federal Data Protection Act (Bundesdatenschutzgesetz - BDSG). 
                    The BDSG contains specific provisions, in particular, on the right to access, the right to erasure, the right to object, the processing of special categories of personal data, the processing for other purposes, and the transmission and automated individual decision-making, including profiling. In addition, state data protection laws of the individual federal states may apply.
                </p>
            </div>
            <div>
                <h2>Transmission of Personal Data</h2>
                <span>All data are stored on our own server and will not be transferred to other servers</span>
            </div>
            <div>
                <h2>International Data Transfers</h2>
                <span>All data are stored on our own server and will not be transferred to other servers</span>
            </div>
            <div>
                <h2>Deletion of Data</h2>
                <span>All data can be deleted directly by the user. Data will be deleted permanently.</span>
            </div>
            <div>
                <h2>Use of Cookies</h2>
                <span>We do not use cookies.</span>
            </div>
            <div>
                <h2>Amendment and Update of the Privacy Policy</h2>
                <p>We kindly ask you to regularly inform yourself about the content of our privacy policy. 
                We adjust the privacy policy as changes in the data processing carried out by us require this. 
                We will inform you as soon as the changes require your cooperation (e.g., consent) or other individual notification.</p>
            </div>
        <section>
    </main>
    `;
}



function returnLegalNoticeHTML(){
    return `
    <main class="legal_content_ctn">
            <div class="legal_content_title">
                <h1>Legal Notice</h1>
                <img onclick="hideLegalContent()" src="../images/arrow-left-line.svg" alt="">
            </div>
            <div>
                <h2>Imprint</h2>
                <div>
                    <p>
                    <ul>
                        <li>Anthony Hamon, Waldemar Giesbrecht, René Porzelt</li>
                        <li>Wickratherstr. 62</li>
                        <li>41363 - Jüchen</li>
                    </ul>
                    </p>
                    <h3>Exploring the Board</h3>
                    <span>Email : h.anthony@outlook.de</span>
                </div>
            </div>
            <div>
                <h2>Acceptance of terms</h2>
                <p>By accessing and using <span class="join_color">Join</span> (Product), you acknowledge and agree to the following terms and
                    conditions, and any policies, guidelines, or amendments thereto that may be presented to you from
                    time to time. We, the listed students, may update or change the terms and conditions from time to
                    time without notice.
                </p>
            </div>
            <div>
                <h2>Scope and ownership of the product</h2>
                <p><span class="join_color">Join</span> has been developed as part of a student group project in a web development bootcamp at the
                    Developer Akademie GmbH. It has an educational purpose and is not intended for extensive personal &
                    business usage. As such, we cannot guarantee consistent availability, reliability, accuracy, or any
                    other aspect of quality regarding this Product. The design of <span class="join_color">Join</span> is owned by the Developer
                    Akademie GmbH. Unauthorized use, reproduction, modification, distribution, or replication of the
                    design is strictly prohibited.
                </p>
            </div>
            <div>
                <h2>Proprietary rights</h2>
                <p>Aside from the design owned by Developer Akademie GmbH, we, the listed students, retain all
                    proprietary rights in <span class="join_color">Join</span>, including any associated copyrighted material, trademarks, and other
                    proprietary information.
                </p>
            </div>
            <div>
                <h2>Use of the product</h2>
                <p><span class="join_color">Join</span> is intended to be used for lawful purposes only, in accordance with all applicable laws and
                    regulations. Any use of <span class="join_color">Join</span> for illegal activities, or to harass, harm, threaten, or intimidate
                    another person, is strictly prohibited. You are solely responsible for your interactions with other
                    users of <span class="join_color">Join</span>.
                </p>
            </div>
            <div>
                <h2>Disclaimer of warranties and limitation of liability</h2>
                <p>
                    <span class="join_color">Join</span> is provided "as is" without warranty of any kind, whether express or implied, including but not
                    limited to the implied warranties of merchantability, fitness for a particular purpose, and
                    non-infringement. In no event will we, the listed students, or the Developer Akademie, be liable for
                    any direct, indirect, incidental, special, consequential or exemplary damages, including but not
                    limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we
                    have been advised of the possibility of such damages, arising out of or in connection with the use
                    or performance of <span class="join_color">Join</span>.
                </p>
            </div>
            <div>
                <h2>Indemnity</h2>
                <p>You agree to indemnify, defend and hold harmless us, the listed students, the Developer Akademie, and
                    our affiliates, partners, officers, directors, agents, and employees, from and against any claim,
                    demand, loss, damage, cost, or liability (including reasonable legal fees) arising out of or
                    relating to your use of <span class="join_color">Join</span> and/or your breach of this Legal Notice. For any questions or notices,
                    please contact us at "h.anthony@outlook.de".</p>
                    <span>Date: November 17, 2023</span>
            </div>
        </main>
    `;
}

function returnHelpHTML(){
    return `
    <main class="legal_content_ctn">
    <div>
        <div class="legal_content_title">
            <h1>Help</h1>
            <img onclick="hideLegalContent()" src="../images/arrow-left-line.svg" alt="">
        </div>
        <div>
            <p>Welcome to the help page for <span class="join_color">Join</span>, your guide to using our kanban project management tool. 
            Here, we'll provide an overview of what <span class="join_color">Join</span> is, how it can benefit you, and how to use it..<br>
        </div>
    </div>    
    <section>
        <div>
            <h2>What is <span class="join_color">Join</span>?</h2>
            <p>
            <span class="join_color">Join</span> is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie. 
                Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). 
                <span class="join_color">Join</span> leverages the principles of kanban to help users manage their tasks and projects in an intuitive, visual interface. It is important to note that <span class="join_color">Join</span> is designed as an educational exercise and is not intended for extensive business usage. 
                While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding <span class="join_color">Join</span>.
            </p>
        </div>
        <div>
            <h2>How to use it</h2>
            <span>Here is a step-by-step guide on how to use <span class="join_color">Join</span>:</span>
        </div>
        <div>
            <ol class="help_how_to_use_liste">
                <li>
                    <h3>Exploring the Board</h3>
                    <p>When you log in to <span class="join_color">Join</span>, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p>
                </li>
                <li>
                    <h3>Creating Contacts</h3>
                    <p>In <span class="join_color">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.</p>
                </li>
                <li>
                    <h3>Adding Cards</h3>
                    <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc.</p>
                </li>
                <li>
                    <h3>Moving Cards</h3>
                    <p>As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.</p>
                </li>
                <li>
                    <h3>Deleting Cards</h3>
                    <p>Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting cards, as this action is irreversible. Remember that using <span class="join_color">Join</span> effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project. Have more questions about <span class="join_color">Join</span>? Feel free to contact us at [Your Contact Email]. We're here to help you!</p>
                </li>
            </ol>
        </div>
    <section>

    <h2>Enjoy using Join!</h2>
</main> 
    `
}