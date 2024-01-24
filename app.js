$(document).ready(function() {
    const jsonData = {"data":[{"id":1,"name":"Ismail","date_of_birth":"1991-02-21 21:03:12","address":"Taman Melawati","working_status":true,"evaluation":{"title":"KDSB-01","score":[{"test_1":30},{"test_2":40},{"test_3":50}],"created_at":"2019-07-11 00:00:00","updated_at":"2019-07-11 00:00:00"}},{"id":2,"name":"Nadir Syafiq","date_of_birth":"1990-05-18 00:02:18","address":"Taman Tenaga","working_status":false,"evaluation":{"title":"KRL-04","score":[{"test_1":53},{"test_2":60},{"test_3":77}],"created_at":"2019-07-11 00:00:00","updated_at":"2019-07-11 00:00:00"}},{"id":3,"name":"Idham Zaidi","date_of_birth":"1993-04-30 18:02:11","address":"Taman Medan","working_status":true,"evaluation":{"title":"KDSB-02","score":[{"test_1":90},{"test_2":50},{"test_3":70}],"created_at":"2019-07-10 00:00:00","updated_at":"2019-07-10 00:00:00"}},{"id":4,"name":"Idham Zaidi","date_of_birth":"1995-01-01 13:00:14","address":"Taman Anjaria","working_status":false,"evaluation":{"title":"MBS-03","score":[{"test_1":59},{"test_2":50},{"test_3":89}],"created_at":"2019-07-08 00:00:00","updated_at":"2019-07-08 00:00:00"}}]}
  
    function calculateAge(dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      return age;
    }
  
    function formatDateInMalaysia(dateString) {
      const options = { timeZone: 'Asia/Kuala_Lumpur' };
      return new Date(dateString).toLocaleString('en-US', options);
    }
  
    const table = $('#evaluationTable').DataTable({
      data: jsonData.data,
      columns: [
        { data: 'name' },
        { data: 'date_of_birth', render: function(data) { return calculateAge(data) + ' years'; } },
        { data: 'address' },
        { data: 'working_status', render: function(data) { return data ? 'Yes' : 'No'; } },
        { 
          data: null,
          render: function(data, type, row) {
            return '<button onclick="exportToCSV(\'' + row.evaluation.title + '\')">Export CSV</button>';
          }
        }
      ]
    });
  
    window.exportToCSV = function(title) {
      const csvData = [];
      csvData.push(['Evaluation', 'Test', 'Score', 'Evaluated At']); 
  
      jsonData.data.forEach(person => {
        person.evaluation.score.forEach(score => {
          const row = [
            person.evaluation.title,
            Object.keys(score)[0],
            score[Object.keys(score)[0]],
            formatDateInMalaysia(person.evaluation.created_at)
          ];
          csvData.push(row);
        });
      });
  
      const csvContent = "data:text/csv;charset=utf-8," +
        csvData.map(row => row.join(',')).join('\n');
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", title + "_evaluation.csv");
      document.body.appendChild(link);
      link.click();
    };
  });
  