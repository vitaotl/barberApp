import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from 'react-native'
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
  ListArea
} from "./styles";

import SearchIcon from "../../assets/search.svg";
import MyLocationIcon from "../../assets/my_location.svg";
import BarberItem from '../../components/BarberItem'

export default () => {
  const navigation = useNavigation();
  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

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

    let lat = null
    let long = null

    if (coords) {
      lat = coords.latitude
      long = coords.longitude
    }

    let res = await Api.getBarbers(lat, long, locationText);
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

  const onRefresh = () => {
    setRefreshing(false)
    getBarbers()
  }

  const handleLocationSearch = () => {
    setCoords({})
    getBarbers()
  }

  return (
    <Container>
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
          </LocationFinder>
        </LocationArea>
        {loading && <LoadingIcon size="large" color="#FFFFFF" />}

        <ListArea>
          {list.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
