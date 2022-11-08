module.exports = (sequelize, Sequelize) => {
   const Resume = sequelize.define("resumes", {
      name: {
         type: Sequelize.STRING
      },
      title: {
            type: Sequelize.STRING
      },
      email: {
            type: Sequelize.STRING
      },
      phone: {
            type: Sequelize.INTEGER
      },
      linkedin: {
            type: Sequelize.STRING
      },
      github: {
            type: Sequelize.STRING
      },
      job: {
            type: Sequelize.STRING
      },
      company: {
         type: Sequelize.STRING
      },
      certificate: {
            type: Sequelize.STRING
      },
      location: {      
            type: Sequelize.STRING
      },
      startDate: {
            type: Sequelize.DATE
      },
      endDate: {
            type: Sequelize.DATE
      },
      projectTitle: {
            type: Sequelize.STRING
      },
      overview: {
            type: Sequelize.STRING
      },
      githubLink: {
            type: Sequelize.STRING
      },
      eduTitle: {
            type: Sequelize.STRING
      },
      facility: {
            type: Sequelize.STRING
      },
      eduStart: {
            type: Sequelize.DATE
      },
      eduEnd: {
            type: Sequelize.DATE
      },
      skill1: {
            type: Sequelize.STRING
      },
      skill2: {
            type: Sequelize.STRING
      },
      skill3: {
            type: Sequelize.STRING
      },
      skill4: {
            type: Sequelize.STRING
      },
      skill5: {
            type: Sequelize.STRING
      },
      skill6: {
            type: Sequelize.STRING
      },
      hobbies1: {
            type: Sequelize.STRING
      },
      hobbies2: {
            type: Sequelize.STRING
      },
      hobbies3: {
            type: Sequelize.STRING
      },
      hobbies4: {
            type: Sequelize.STRING
      },
      hobbies5: {
            type: Sequelize.STRING
      },
      hobbies6: {
            type: Sequelize.STRING
      },
   });
   
   return Resume;
};