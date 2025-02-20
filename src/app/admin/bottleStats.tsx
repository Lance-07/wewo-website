"use client"; 
import { useEffect } from "react";
import { supabase } from "../../../supabase"; 

interface BottleStatsProps {
    onDataUpdate: (data: { totalLiters: number; totalBottles: number }) => void;
    setLoading?: (T: boolean) => void | undefined;
}

export default function BottleStats({ onDataUpdate, setLoading }: BottleStatsProps) {
    const fetchBottleData = async () => {
        if (setLoading) {
            setLoading(true);
        }
        const { data, error } = await supabase
            .from("CollectedBottles")
            .select("totalLiters, small, medium, large");

        if (error) {
            console.error("Error fetching total liters:", error);
            return;
        }

        let totalLiters = 0;
        let totalBottles = 0;

        data.forEach((bottle) => {
            totalLiters += bottle.totalLiters;
            totalBottles += bottle.small + bottle.medium + bottle.large;
        });
        if (setLoading) {
            setLoading(false);
        }
        onDataUpdate({ totalLiters, totalBottles });
    };

    useEffect(() => {
        fetchBottleData(); 

        const subscription = supabase
            .channel("bottle-updates")
            .on("postgres_changes", { event: "*", schema: "public", table: "CollectedBottles" }, (payload) => {
                fetchBottleData();
                console.log("payload: ", payload);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return null;
}
