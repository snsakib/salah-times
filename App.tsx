import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [salahTimings, setSalahTimings] = useState([]);
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");

  const renderSalahTimings = () => {
    return Object.keys(salahTimings).map((salahName) => (
      <View key={salahName} style={styles.salahTime}>
        <Text style={{ color: 'white', fontSize: 18 }}>{salahName}</Text>
        <Text style={{ color: 'white', fontSize: 18 }}>{salahTimings[salahName]}</Text>
      </View>
    ));
  };

  const getSalahTimings = () => {
    const ac = new AbortController();
    return fetch(
      "http://api.aladhan.com/v1/timingsByCity?city=Sylhet&country=Bangladesh&method=1"
    )
      .then((response) => response.json())
      .then((json) => {
        setSalahTimings(json.data.timings);
        setGregorianDate(json.data.date.readable);
        setHijriDate(
          `${json.data.date.hijri.day} ${json.data.date.hijri.month.en} ${json.data.date.hijri.year}`
        );
      })
      .catch((error) => {
        return () => ac.abort();
      });
  };

  useEffect(() => {
    getSalahTimings();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{gregorianDate}</Text>
        <Text style={styles.date}>{hijriDate}</Text>
      </View>
      <View style={styles.salahTimings}>{renderSalahTimings()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
  },
  header: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  date: {
    color: "black",
    fontWeight: 'bold'
  },
  salahTimings: {
    flex: 8,
    alignItems: "center",
    marginTop: 20,
  },
  salahTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 10,
    backgroundColor: "black",
    color: "white",
  },
});
