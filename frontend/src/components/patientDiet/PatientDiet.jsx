import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { Input } from "../ui/input";
import './PatientDiet.css';
import { Button } from "../ui/button";
import { toast } from "sonner";
import { setDietMeal } from "@/store/dietMealSlice";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const PatientDiet = () => {
  const { patientId: paramPatientId } = useParams();
  const location = useLocation();
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    if (location?.state?.patientId) {
      setPatientId(location.state.patientId);
    } else if (paramPatientId) {
      setPatientId(paramPatientId);
    }
  }, [paramPatientId, location.state]);

  const dispatch = useDispatch();
  const [meals, setMeals] = useState({
    morning: { ingredients: [], instructions: "" },
    evening: { ingredients: [], instructions: "" },
    night: { ingredients: [], instructions: "" },
  });
  
  const handleIngredientChange = (mealType, index, value) => {
    const updatedIngredients = [...meals[mealType].ingredients];
    updatedIngredients[index] = value;

    setMeals({
      ...meals,
      [mealType]: { ...meals[mealType], ingredients: updatedIngredients },
    });
  };

  const addIngredient = (mealType) => {
    setMeals({
      ...meals,
      [mealType]: {
        ...meals[mealType],
        ingredients: [...meals[mealType].ingredients, ""],
      },
    });
  };

  const handleInstructionsChange = (mealType, value) => {
    setMeals({
      ...meals,
      [mealType]: { ...meals[mealType], instructions: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/patient/create-diet/${patientId}`,
        { meals },
        { withCredentials: true }
      );
      if(response.data.success)
      dispatch(setDietMeal(meals))
      toast.success(response.data.message)  
    } catch (error) {
      toast.error(error.response.data.message)  
      
    }
  };

  return (
    <div className="generalPatientDietBox h-screen">
      <div>
        <LeftSideBar />
      </div>
      <div className="createDietBox">
        <form onSubmit={handleSubmit} className="patientDietForm">
          <div className="flex ">
            <span className="font-bold font-sans w-24">Patient ID:</span>
            <Input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
              className='w-[14rem]'
            />
          </div>
          {["morning", "evening", "night"].map((mealType) => (
            <div key={mealType} className="flex flex-col">
              <h3 className="text-red-600">{mealType.charAt(0).toUpperCase() + mealType.slice(1)} Meal</h3>
              <label>
                Ingredients:
                {meals[mealType].ingredients.map((ingredient, index) => (
                  <div className="" key={index}>
                    <Input
                      type="text"
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(mealType, index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </label>
              <div className="flex justify-between">
                <Button className='w-[20rem]' type="button" onClick={() => addIngredient(mealType)}>
                  Add Ingredient
                </Button>
                <textarea
                  value={meals[mealType].instructions}
                  onChange={(e) =>
                    handleInstructionsChange(mealType, e.target.value)
                  }
                  placeholder="Instructions"
                  required
                />
              </div>
            </div>
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default PatientDiet;
