import Axios from 'axios'

export const getLocus = ({ lat, lng }) => {
    let msgError = null;
    let results = null;
    const suspender = async () => {
        try {
            const { data } = await Axios.get(`/store?lat=${lat}&lng=${lng}`)
            msgError = false
            results = data;
        } catch (error) {
            msgError = true
            results = []
        }
    }
    return {
        read: async function () {
            if (msgError === null) await suspender();
            return { results, msgError };
        }
    }
}

export const getUserLocation = () => {
    let msgError = null;
    let location = { lat: null, lng: null, name: "", address: "" };
    const suspender = async () => {
        try {
            const { data } = await Axios.get(`https://ipapi.co/json`);
            location.lat = data.latitude;
            location.lng = data.longitude;
            location.name = data.city;
            location.address = data.region;
            msgError = false;
        } catch (error) {
            navigator.geolocation.getCurrentPosition(pos => {
                location.lat = pos.coords.latitude;
                location.lng = pos.coords.longitude;
                location.name = "";
                location.address = "";
            });
            msgError = true;
        }
    }
    return {
        read: async function () {
            if (msgError === null) await suspender();
            return { location, msgError };
        }
    }
}

