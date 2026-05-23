import { colors } from "@/src/styles/global";
import { formatTaskDate, formatTaskTime } from "@/src/utils/taskDates";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  dueDate?: Date | null;
};

export default function TaskPrazoDisplay({ dueDate }: Props) {
  if (!dueDate) return null;

  return (
    <View style={styles.row}>
      <View style={styles.item}>
        <MaterialCommunityIcons name="calendar-outline" size={20} color="rgba(0,0,0,0.55)" />
        <Text style={styles.text}>{formatTaskDate(dueDate)}</Text>
      </View>

      <View style={styles.item}>
        <MaterialCommunityIcons name="clock-outline" size={20} color="rgba(0,0,0,0.55)" />
        <Text style={styles.text}>{formatTaskTime(dueDate)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    width: "100%",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 112,
    justifyContent: "center",
    backgroundColor: colors.branco,
  },
  text: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 13,
    fontWeight: "500",
  },
});