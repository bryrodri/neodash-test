import React, { useCallback, useEffect } from "react";
import { ChartProps } from "./Chart";
import {
  CircularProgress,
  debounce,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NeoField from "../component/field/Field";
import storage from "redux-persist/lib/storage";

/**
 * Renders Neo4j records as their JSON representation.
 */
const NeoParameterSelectionChart = (props: ChartProps) => {
  const records = props.records;
  const query = records[0]["input"] ? records[0]["input"] : undefined;
  const parameter =
    props.settings && props.settings["parameterName"]
      ? props.settings["parameterName"]
      : undefined;
  const type =
    props.settings && props.settings["type"]
      ? props.settings["type"]
      : undefined;
  const suggestionsUpdateTimeout =
    props.settings && props.settings["suggestionsUpdateTimeout"]
      ? props.settings["suggestionsUpdateTimeout"]
      : 250;
  const setParameterTimeout =
    props.settings && props.settings["setParameterTimeout"]
      ? props.settings["setParameterTimeout"]
      : 1000;

  const currentValue =
    props.getGlobalParameter && props.getGlobalParameter(parameter)
      ? props.getGlobalParameter(parameter)
      : "";
  const [extraRecords, setExtraRecords] = React.useState([]);
  const [inputText, setInputText] = React.useState(currentValue);
  const [value, setValue] = React.useState(currentValue);

  const debouncedQueryCallback = useCallback(
    debounce(props.queryCallback, suggestionsUpdateTimeout),
    []
  );

  const debouncedSetGlobalParameter = useCallback(
    debounce(props.setGlobalParameter, setParameterTimeout),
    []
  );

  useEffect(() => {
    if (label === "n1") {
      setInputText("");
      debouncedQueryCallback &&
        debouncedQueryCallback(query, { input: "" }, setExtraRecords);
      debouncedSetGlobalParameter(parameter, undefined);
    }
  }, []);

  useEffect(() => {
    if (label === "n3") {
      storage.removeItem("n3");
      setValue(null)
      setInputText("");
      debouncedQueryCallback &&
        debouncedQueryCallback(query, { input: "" }, setExtraRecords);
      debouncedSetGlobalParameter(parameter, undefined);
    }
  }, [localStorage.getItem("n2")]);

  useEffect(() => {
    console.log('entre')
    console.log('entre',  localStorage.getItem('n1')?.replaceAll('"',''))

    if (label === "n2" || label === "n3") {
      storage.removeItem("n2");
      storage.removeItem("n3");
      setValue(null)
      setInputText("");
      debouncedQueryCallback &&
        debouncedQueryCallback(query, { input: "" }, setExtraRecords);
      debouncedSetGlobalParameter(parameter, undefined);
    }
  }, [localStorage.getItem("n1")]);

  useEffect(() => {
    debouncedQueryCallback &&
      debouncedQueryCallback(query, { input: inputText }, setExtraRecords);
  }, [inputText, query]);

  // In case the components gets (re)loaded with a different/non-existing selected parameter, set the text to the current global parameter value.
  if (query && value != currentValue && currentValue != inputText) {
    setValue(currentValue);
    setInputText(currentValue);
    setExtraRecords([]);
  }
  if (!query || query.trim().length == 0) {
    return (
      <p style={{ margin: "15px" }}>
        No selection specified. Open up the report settings and choose a node
        label and property.
      </p>
    );
  }

  const label =
    props.settings && props.settings["entityType"]
      ? props.settings["entityType"]
      : "";
  const property =
    props.settings && props.settings["propertyType"]
      ? props.settings["propertyType"]
      : "";
  const settings = props.settings ? props.settings : {};
  const helperText = settings.helperText;
  const clearParameterOnFieldClear = settings.clearParameterOnFieldClear;

  return (
    <div>
      {type == "Free Text" ? (
        <>
          <NeoField
            key={"freetext"}
            label={helperText ? helperText : label + " " + property}
            defaultValue={""}
            value={value}
            variant="outlined"
            placeholder={"Enter text here..."}
            style={{
              maxWidth: "calc(100% - 30px)",
              marginLeft: "15px",
              marginTop: "5px",
            }}
            onChange={(newValue) => {
              // TODO: i want this to be a proper wait instead of triggering on the first character.
              if (newValue == null && clearParameterOnFieldClear) {
                setValue("");
                debouncedSetGlobalParameter(parameter, undefined);
              } else {
                setValue(newValue);
                debouncedSetGlobalParameter(parameter, newValue);
              }
            }}
          />
          {value !== currentValue ? (
            <CircularProgress
              size={26}
              style={{ marginTop: "20px", marginLeft: "5px" }}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <Autocomplete
          id="autocomplete"
          className="autocomplete"
          options={extraRecords
            .map((r) =>
              r["_fields"] && r["_fields"][0] !== null
                ? r["_fields"][0]
                : "(Sin datos)"
            )
            .sort()}
          getOptionLabel={(option) => (option ? option.toString() : "")}
          style={{
            maxWidth: "calc(100% - 30px)",
            marginLeft: "15px",
            marginTop: "5px",
          }}
          inputValue={inputText}
          onInputChange={(event, value) => {
            console.log('value1', value)
            debouncedQueryCallback(
              query,
              { input: "" + value },
              setExtraRecords
            );
          }}
          onSelect={() => {
            debouncedQueryCallback &&
              debouncedQueryCallback(
                query,
                { input: inputText },
                setExtraRecords
              );
          }}
          getOptionSelected={(option, value) =>
            (option && option.toString()) === (value && value.toString())
          }
          value={value ? value.toString() : "" + currentValue}
          onChange={(event, newValue) => {
            console.log('entre2',  localStorage.getItem('n1')?.replaceAll('"',''))

            if (label === "n1") {
              localStorage.setItem("n1", JSON.stringify(newValue));
            }
            if (label === "n2") {
              localStorage.setItem("n2", JSON.stringify(newValue));
            }
            setValue(newValue);
            setInputText("" + newValue);

            if (newValue && newValue["low"]) {
              newValue = newValue["low"];
            }
            if (newValue == null && clearParameterOnFieldClear) {
              props.setGlobalParameter(parameter, undefined);
            } else {
              props.setGlobalParameter(parameter, newValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              placeholder="Start typing..."
              label={helperText ? helperText : label + " " + property}
              variant="outlined"
            />
          )}
        />
      )}
    </div>
  );
};

export default NeoParameterSelectionChart;
