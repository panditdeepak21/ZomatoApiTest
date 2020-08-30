import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { getRestaurantsAPI } from "./utils";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      restaurants: null,
    };
  }

  componentDidMount() {
    getRestaurantsAPI().then((data) => {
      this.setState({ restaurants: data.restaurants, loading:false });
    });
  }

  render() {
    const { loading, restaurants } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.head}>
          Restaurants
          <MaterialCommunityIcons name="fire" size={32} color="orange" />
        </Text>
        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            {restaurants && (
              <View style={styles.container}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={restaurants}
                  renderItem={({ item }) => (
                    <View key={item.id} style={styles.card}>
                      <Image
                        source={{ uri: item.restaurant.thumb }}
                        style={styles.image}
                      />
                      <Text style={styles.title}>{item.restaurant.name}</Text>
                      <Text style={styles.desc}>
                        {item.restaurant.location.address} {", "}
                        {item.restaurant.location.city}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
          </>
        )}
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 32,
  },
  card: {
    marginTop: 15,
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 6,
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
  },
  title: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: "700",
  },
  desc: {
    opacity: 0.6,
    fontSize: 16,
    width: width * 0.9,
  },
});
