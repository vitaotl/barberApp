import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// import { request, PERMISSIONS } from "react-native-permissions";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import Api from "../../Api";

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
} from "./styles";

import SearchIcon from "../../assets/search.svg";
import MyLocationIcon from "../../assets/my_location.svg";

export default () => {
  const navigation = useNavigation();
  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleLocationFinder = async () => {
    setCoords(null);
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    // let result = await request(
    //   Platform.OS === "ios"
    //     ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    //     : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    // );

    if (status === "granted") {
      setLoading(true);
      setLocationText("");
      setList([]);
      const userLocation = await Location.getCurrentPositionAsync();
      setCoords({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      getBarbers();
    }
  };

  const getBarbers = async () => {
    setLoading(true);
    setList([]);

    let res = await Api.getBarbers();
    console.log(res);
    if (res.error == "") {
        if (res.loc) {
            setLocationText(res.loc)
        }
      setList(res.data);
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBarbers();
  }, []);

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate("Search")}>
            <SearchIcon width="26" height="26" fill="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#FFFFFF"
            value={locationText}
            onChangeText={(t) => setLocationText(t)}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
          </LocationFinder>
        </LocationArea>
        {loading && <LoadingIcon size="large" color="#FFFFFF" />}
      </Scroller>
    </Container>
  );
};
