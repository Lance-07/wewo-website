"use client"; 
import { useEffect } from "react";
import { supabase } from "../../../supabase"; 

interface BottleStatsProps {
    setLoading?: (T: boolean) => void | undefined;
    onDataUpdate: (data: { totalLiters: number; totalBottles: number, smallTotal: number, mediumTotal: number, largeTotal: number }) => void;
    className?: string;
}

export default function BottleStats({ onDataUpdate, setLoading }: BottleStatsProps) {
    const fetchBottleData = async () => {
        if (setLoading) {
            setLoading(true);
        }
        const { data, error } = await supabase
            .from("CollectedBottles")
            .select("totalLiters, small, medium, large")

        if (error) {
            console.error("Error fetching total liters:", error);
            return;
        }

        if (data) {
            console.log("data; ",data)
        }

        let smallTotal = 0 
        let mediumTotal = 0
        let largeTotal = 0
        let totalLiters = 0;
        let totalBottles = 0;
        
        data.forEach((bottle) => {
            totalLiters += bottle.totalLiters;
            smallTotal += bottle.small
            mediumTotal += bottle.medium
            largeTotal += bottle.large
            totalBottles += bottle.small + bottle.medium + bottle.large;
        });
        if (setLoading) {
            setLoading(false);
        }

        onDataUpdate({ totalLiters, totalBottles, smallTotal, mediumTotal, largeTotal });
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
