import axios from 'axios';

const baseURL = 'http://localhost:4000';

const TaskAPI = {
  async createProjectTask({ token, projectId, data }) {
    try {
      const response = await axios({
        baseURL,
        url: `/users/current/projects/${projectId}/tasks`,
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

  async getProjectTasks({ token, projectId }) {
    try {
      const response = await axios({
        baseURL,
        url: `/users/current/projects/${projectId}/tasks`,
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

  async getProjectTaskById({ token, projectId, taskId }) {
    try {
      const response = await axios({
        baseURL,
        url: `/users/current/projects/${projectId}/tasks/${taskId}`,
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

  async updateProjecTask({ token, projectId, taskId, data }) {
    try {
      const response = await axios({
        baseURL: 'http://localhost:4000',
        url: `/users/current/projects/${projectId}/tasks/${taskId}`,
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

  async removeProjecTask({ token, projectId, taskId }) {
    try {
      const response = await axios({
        baseURL: 'http://localhost:4000',
        url: `/users/current/projects/${projectId}/tasks/${taskId}`,
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

export default TaskAPI;
