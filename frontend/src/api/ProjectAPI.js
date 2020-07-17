import axios from 'axios';

const baseURL = 'http://localhost:4000';

const ProjectAPI = {
  async createUserProject({ token, data }) {
    try {
      const response = await axios({
        baseURL,
        url: `/users/current/projects`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        data,
      });

      if (response.status === 201) {
        const { data } = response;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  },

  async getUserProjects({ token }) {
    try {
      const response = await axios({
        baseURL,
        url: '/users/current/projects',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.status === 200) {
        const { data } = response;
        return data.projects;
      }
    } catch (err) {
      console.error(err);
    }
  },

  async getUserProjectById({ token, projectId }) {
    try {
      const response = await axios({
        baseURL,
        url: `/users/current/projects/${projectId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.status === 200) {
        const { data } = response;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  },

  async updateUserProject({ token, projectId, data }) {
    try {
      const response = await axios({
        baseURL,
        url: `/users/current/projects/${projectId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        data,
      });

      if (response.status === 200) {
        const { data } = response;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  },

  async removeUserProject({ token, projectId }) {
    try {
      const response = await axios({
        baseURL,
        url: `/users/current/projects/${projectId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.status === 200) {
        const { data } = response;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  },
};

export default ProjectAPI;
